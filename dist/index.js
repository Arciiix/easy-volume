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
exports.toggleMute = exports.setMute = exports.getMute = exports.setVolume = exports.getVolume = void 0;
const os = require("os");
const windows_1 = require("./platforms/windows");
const darwin_1 = require("./platforms/darwin");
const linux_1 = require("./platforms/linux");
const osType = os.type();
let universal;
switch (osType.toLowerCase()) {
    case "windows_nt":
        universal = windows_1.windows;
        break;
    case "darwin":
        universal = darwin_1.darwin;
        break;
    case "linux":
        universal = linux_1.linux;
        break;
    default:
        throw new Error(`Your OS (${osType}) is not supported by the easy-volume library!`);
}
const { getVolume, setVolume, getMute, setMute, toggleMute } = Object.assign(Object.assign({}, universal), { toggleMute: () => __awaiter(void 0, void 0, void 0, function* () {
        const currentState = yield getMute();
        yield setMute(!currentState);
        return !currentState;
    }) });
exports.getVolume = getVolume;
exports.setVolume = setVolume;
exports.getMute = getMute;
exports.setMute = setMute;
exports.toggleMute = toggleMute;
//# sourceMappingURL=index.js.map