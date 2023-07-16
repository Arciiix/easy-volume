import { spawn } from "child_process";
import "hazardous";

export const execCommand = (cmd: string, args: string[]): Promise<string> =>
  new Promise((resolve, reject) => {
    const process = spawn(cmd, args);
    const errors: string[] = [];
    const stdout: string[] = [];

    process.stdout.on("data", (data) => {
      stdout.push(data.toString());
    });

    process.on("error", (e) => {
      errors.push(e.toString());
    });

    process.on("close", () => {
      if (errors.length) {
        reject(errors.join(""));
      } else {
        resolve(stdout.join(""));
      }
    });
  });
