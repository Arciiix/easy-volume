import * as os from "os";
import { PlatformImplementation } from "./types";
import { windows } from "./platforms/windows";

const osType = os.type();

let universal: PlatformImplementation;

switch (osType.toLowerCase()) {
  case "windows_nt":
    universal = windows;
    break;
  default:
    throw new Error(
      `Your OS (${osType}) is not supported by the easy-volume library!`
    );
}

const { getVolume, setVolume } = universal;
export { getVolume, setVolume };
