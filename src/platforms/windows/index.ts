import { execCommand } from "../../execCommand";
import {
  GetVolumeError,
  PlatformImplementation,
  SetVolumeError,
} from "../../types";

export const windows: PlatformImplementation = {
  getVolume: async () => {
    const response = await execCommand("./platforms/windows/volume.exe", [
      "get",
    ]);

    if (isNaN(parseInt(response)) || parseInt(response) === -1)
      throw new GetVolumeError();
    return parseInt(response);
  },
  setVolume: async (val: number) => {
    if (val < 0 || val > 100) throw new SetVolumeError();

    const response = await execCommand("./platforms/windows/volume.exe", [
      "set",
      val.toString(),
    ]);

    if (isNaN(parseInt(response)) || parseInt(response) === -1)
      throw new SetVolumeError();
  },
};
