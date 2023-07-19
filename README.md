# easy-volume
Controlling system volume level in Node.js **has never been easier**!

This **cross-platform** library lets you **control and get the status of volume** in your system. **No matter what OS or what framework** (it works everywhere - as well as on regular Node.js and Electron), you don't have to worry about the compatibility and potential errors - this library will **handle it all**!

## Usage
```typescript
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
```


## API
```getVolume(): Promise<number>```
* Get current system volume
* **Returns**: System volume, from 0 to 100 [%]

```setVolume(targetValue: number) => Promise<void>```
* Change system volume to target value
* **Param** *targetValue*: Target volume, from 0 to 100

```getMute(): Promise<boolean>```
* Get current mute status (whether the system audio is muted or not)
* **Returns**: Whether the system audio is muted, i.e. true == muted, false == unmuted
 

```setMute(isMuted: boolean) => Promise<void>```
* Either mute or unmute system audio
* **Param** *isMuted*: Whether to mute or unmute the system audio
   
```toggleMute() => Promise<void>```
* Toggle mute state
* **Returns**: Current (new) mute state (true == muted, false == unmuted)


## Compatibility
### This library should be compatible with every of the most popular OS:
* **Windows** (uses **native C++ CLI tool** I wrote by myself (see [```src/platforms/windows/main.cpp```](src/platforms/windows/main.cpp)))
* **macOS** (uses **AppleScript (osascript)**)
* **Linux** (uses **Advanced Linux Sound Architecture (ALSA, amixer)** - installed by default on most Linux distros)
### Tested on:
* Windows 11 22H2
* macOS Ventura 13.4
* Ubuntu 22.04.2 LTS

## Test
You can test the library on your setup by running this command:
```bash
npm test
```
If any of the test fails or you're using another setup which isn't implemented here, feel free to create an issue or a pull request.

Feel free to give some ideas for future features by creating issues on the [GitHub repository](https://github.com/Arciiix/easy-volume).

Made with ❤️ by [Artur Nowak](https://github.com/Arciiix)