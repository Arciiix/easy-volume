import { ExecException, exec } from "child_process";
import "hazardous";

export const execCommand = (cmd: string, args: string[]): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(
      `${cmd} ${args.join(" ")}`,
      (err: ExecException, stdout: string, stderr: string) => {
        if (err || stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      }
    );
  });
