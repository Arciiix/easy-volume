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
exports.windows = void 0;
const path_1 = require("path");
const execCommand_1 = require("../../execCommand");
const types_1 = require("../../types");
const toElectronPath_1 = require("../../utils/toElectronPath");
exports.windows = {
    getVolume: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, execCommand_1.execCommand)((0, toElectronPath_1.default)((0, path_1.join)((0, path_1.dirname)(__filename), "volume.exe")), ["get"]);
        if (isNaN(parseInt(response)) || parseInt(response) === -1)
            throw new types_1.GetVolumeError();
        return parseInt(response);
    }),
    setVolume: (val) => __awaiter(void 0, void 0, void 0, function* () {
        if (val < 0 || val > 100)
            throw new types_1.SetVolumeError();
        const response = yield (0, execCommand_1.execCommand)((0, toElectronPath_1.default)((0, path_1.join)((0, path_1.dirname)(__filename), "volume.exe")), ["set", val.toString()]);
        if (isNaN(parseInt(response)) || parseInt(response) === -1)
            throw new types_1.SetVolumeError();
    }),
    getMute: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, execCommand_1.execCommand)((0, toElectronPath_1.default)((0, path_1.join)((0, path_1.dirname)(__filename), "volume.exe")), ["mute_status"]);
        let isMuted = response !== "0";
        return isMuted;
    }),
    setMute: (isMuted) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, execCommand_1.execCommand)((0, toElectronPath_1.default)((0, path_1.join)((0, path_1.dirname)(__filename), "volume.exe")), [
            isMuted ? "mute" : "unmute",
        ]);
    }),
};
//# sourceMappingURL=index.js.map