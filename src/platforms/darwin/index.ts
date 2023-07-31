import { execCommand } from "../../execCommand";
import {
  GetVolumeError,
  PlatformImplementation,
  SetVolumeError,
} from "../../types";

export const darwin: PlatformImplementation = {
  getVolume: async () => {
    const volume = await execCommand("osascript", [
      "-e",
      "'output volume of (get volume settings)'",
    ]);
    if (!volume || isNaN(parseInt(volume))) throw new GetVolumeError();
    return parseInt(volume);
  },
  setVolume: async (val: number) => {
    if (val < 0 || val > 100) throw new SetVolumeError();

    await execCommand("osascript", ["-e", `'set volume output volume ${val}'`]);
  },
  getMute: async () => {
    const muteStatus = await execCommand("osascript", [
      "-e",
      "'output muted of (get volume settings)'",
    ]);
    const isMuted = muteStatus.trim() === "true";
    return isMuted;
  },
  setMute: async (isMuted: boolean) => {
    await execCommand("osascript", [
      "-e",
      `'set volume output muted ${isMuted ? "true" : "false"}'`,
    ]);
  },
};
