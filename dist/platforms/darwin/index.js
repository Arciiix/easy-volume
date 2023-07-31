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
exports.darwin = void 0;
const execCommand_1 = require("../../execCommand");
const types_1 = require("../../types");
exports.darwin = {
    getVolume: () => __awaiter(void 0, void 0, void 0, function* () {
        const volume = yield (0, execCommand_1.execCommand)("osascript", [
            "-e",
            "'output volume of (get volume settings)'",
        ]);
        if (!volume || isNaN(parseInt(volume)))
            throw new types_1.GetVolumeError();
        return parseInt(volume);
    }),
    setVolume: (val) => __awaiter(void 0, void 0, void 0, function* () {
        if (val < 0 || val > 100)
            throw new types_1.SetVolumeError();
        yield (0, execCommand_1.execCommand)("osascript", ["-e", `'set volume output volume ${val}'`]);
    }),
    getMute: () => __awaiter(void 0, void 0, void 0, function* () {
        const muteStatus = yield (0, execCommand_1.execCommand)("osascript", [
            "-e",
            "'output muted of (get volume settings)'",
        ]);
        const isMuted = muteStatus.trim() === "true";
        return isMuted;
    }),
    setMute: (isMuted) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, execCommand_1.execCommand)("osascript", [
            "-e",
            `'set volume output muted ${isMuted ? "true" : "false"}'`,
        ]);
    }),
};
//# sourceMappingURL=index.js.map