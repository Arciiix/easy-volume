"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linux = void 0;
require("hazardous");
const execCommand_1 = require("../../execCommand");
const types_1 = require("../../types");
exports.linux = {
    getVolume: () => __awaiter(void 0, void 0, void 0, function* () {
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
        const stdout = yield (0, execCommand_1.execCommand)(`amixer`, ["sget", "Master"]);
        if (!stdout)
            throw new types_1.GetVolumeError();
        const channels = stdout.toString().match(/(?<=\[)(\d+)(?=%\])/g); // This regex finds a digit(s) which is prefixed with "[" and suffixed with "%]"
        if (!channels.length)
            throw new types_1.GetVolumeError();
        const sum = channels.reduce((acc, curr) => acc + parseInt(curr), 0);
        // If any number was NaN, throw an error
        if (isNaN(sum))
            throw new types_1.GetVolumeError();
        return sum / channels.length; // Return the mean
    }),
    setVolume: (val) => __awaiter(void 0, void 0, void 0, function* () {
        if (val < 0 || val > 100)
            throw new types_1.SetVolumeError();
        yield (0, execCommand_1.execCommand)("amixer", ["set", "Master", `${val}%`]);
    }),
    getMute: () => __awaiter(void 0, void 0, void 0, function* () {
        // The same thing as above - it gets the values for each channel - e.g. front left and front right
        const stdout = yield (0, execCommand_1.execCommand)("amixer", ["sget", "Master"]);
        if (!stdout)
            throw new types_1.GetVolumeError();
        // It returns true (=== muted) if all channels are muted, otherwise returns false
        let isMuted = false;
        stdout.match(/\[(on|off)\]/g).forEach((state) => {
            if (state === "[off]")
                isMuted = true;
        });
        return isMuted;
    }),
    setMute: (isMuted) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, execCommand_1.execCommand)("amixer", ["set", "Master", isMuted ? "mute" : "unmute"]);
    }),
};
//# sourceMappingURL=index.js.map