import { setVolume, getVolume, setMute, getMute } from "easy-volume";

// Set volume - value from 0 to 100%
await setVolume(20);

// Get volume - value from 0 to 100%
const volume: number = await getVolume();
console.log(volume); // 20

// Set mute - true is muted and false is unmuted
await setMute(true);

// Get current mute status - true if system audio is muted, otherwise false
const isMuted: boolean = await getMute();
console.log(isMuted); // true
