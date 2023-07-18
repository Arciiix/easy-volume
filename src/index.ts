import * as os from "os";
import { PlatformImplementation, VolumeControl } from "./types";
import { windows } from "./platforms/windows";
import { darwin } from "./platforms/darwin";

const osType = os.type();

let universal: PlatformImplementation;

switch (osType.toLowerCase()) {
  case "windows_nt":
    universal = windows;
    break;
  case "darwin":
    universal = darwin;
    break;
  default:
    throw new Error(
      `Your OS (${osType}) is not supported by the easy-volume library!`
    );
}

const { getVolume, setVolume, getMute, setMute, toggleMute }: VolumeControl = {
  ...universal,
  toggleMute: async () => {
    const currentState = await getMute();
    await setMute(!currentState);
    return !currentState;
  },
};

export { getVolume, setVolume, getMute, setMute, toggleMute };
