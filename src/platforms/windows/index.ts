import { dirname, join } from "path";
import { execCommand } from "../../execCommand";
import {
  GetVolumeError,
  PlatformImplementation,
  SetVolumeError,
} from "../../types";
import toElectronPath from "../../utils/toElectronPath";

export const windows: PlatformImplementation = {
  getVolume: async () => {
    const response = await execCommand(
      toElectronPath(join(dirname(__filename), "volume.exe")),
      ["get"]
    );

    if (isNaN(parseInt(response)) || parseInt(response) === -1)
      throw new GetVolumeError();
    return parseInt(response);
  },
  setVolume: async (val: number) => {
    if (val < 0 || val > 100) throw new SetVolumeError();

    const response = await execCommand(
      toElectronPath(join(dirname(__filename), "volume.exe")),

      ["set", val.toString()]
    );

    if (isNaN(parseInt(response)) || parseInt(response) === -1)
      throw new SetVolumeError();
  },
  getMute: async () => {
    const response = await execCommand(
      toElectronPath(join(dirname(__filename), "volume.exe")),

      ["mute_status"]
    );

    let isMuted = response !== "0";
    return isMuted;
  },
  setMute: async (isMuted: boolean) => {
    await execCommand(toElectronPath(join(dirname(__filename), "volume.exe")), [
      isMuted ? "mute" : "unmute",
    ]);
  },
};
