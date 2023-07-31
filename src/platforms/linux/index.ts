import { execCommand } from "../../execCommand";
import {
  GetVolumeError,
  PlatformImplementation,
  SetVolumeError,
} from "../../types";

export const linux: PlatformImplementation = {
  getVolume: async () => {
    /* Example amixer sget Master output:
    Simple mixer control 'Master',0
    Capabilities: pvolume pswitch pswitch-joined
    Playback channels: Front Left - Front Right
    Limits: Playback 0 - 65536
    Mono:
    Front Left: Playback 26214 [40%] [on]
    Front Right: Playback 26214 [40%] [on]
    */
    // For simplicity, we'll get the mean of left and right volume, so if they're the same, it will be the same value
    const stdout = await execCommand(`amixer`, ["sget", "Master"]);
    if (!stdout) throw new GetVolumeError();

    const channels = stdout.toString().match(/(?<=\[)(\d+)(?=%\])/g); // This regex finds a digit(s) which is prefixed with "[" and suffixed with "%]"
    if (!channels.length) throw new GetVolumeError();

    const sum = channels.reduce((acc, curr) => acc + parseInt(curr), 0);

    // If any number was NaN, throw an error
    if (isNaN(sum)) throw new GetVolumeError();

    return sum / channels.length; // Return the mean
  },
  setVolume: async (val: number) => {
    if (val < 0 || val > 100) throw new SetVolumeError();

    await execCommand("amixer", ["set", "Master", `${val}%`]);
  },
  getMute: async () => {
    // The same thing as above - it gets the values for each channel - e.g. front left and front right
    const stdout = await execCommand("amixer", ["sget", "Master"]);
    if (!stdout) throw new GetVolumeError();

    // It returns true (=== muted) if all channels are muted, otherwise returns false
    let isMuted = false;
    stdout.match(/\[(on|off)\]/g).forEach((state) => {
      if (state === "[off]") isMuted = true;
    });

    return isMuted;
  },
  setMute: async (isMuted: boolean) => {
    await execCommand("amixer", ["set", "Master", isMuted ? "mute" : "unmute"]);
  },
};
