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
const console_1 = require("console");
const __1 = require("..");
const types_1 = require("../types");
describe("volume", () => {
    let oldVolume = -1;
    const randomVolume = Math.floor(Math.random() * 100);
    it("gets volume", () => __awaiter(void 0, void 0, void 0, function* () {
        const volume = yield (0, __1.getVolume)();
        (0, console_1.assert)(volume !== -1);
        (0, console_1.assert)(volume <= 100 && volume >= 0);
        (0, console_1.assert)(!isNaN(volume));
        console.log(`volume: ${volume}`);
        oldVolume = volume;
    }));
    it("handles invalid volume above", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((0, __1.setVolume)(110)).rejects.toThrow(types_1.SetVolumeError);
    }));
    it("handles invalid volume below", () => __awaiter(void 0, void 0, void 0, function* () {
        expect((0, __1.setVolume)(-1)).rejects.toThrow(types_1.SetVolumeError);
    }));
    it("sets volume without error", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, __1.setVolume)(randomVolume);
    }));
    it("sets volume properly", () => __awaiter(void 0, void 0, void 0, function* () {
        const newVolume = yield (0, __1.getVolume)();
        expect(newVolume).toBe(randomVolume);
    }));
    it("sets volume back to normal", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, __1.setVolume)(oldVolume);
    }));
    it("mutes", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, __1.setMute)(true);
    }));
    it("gets mute status properly", () => __awaiter(void 0, void 0, void 0, function* () {
        const muteStatus = yield (0, __1.getMute)();
        // Since the previous test is muting, it should be true
        expect(muteStatus).toBe(true);
    }));
    it("unmutes properly by using toggleMute", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, __1.toggleMute)();
        const status = yield (0, __1.getMute)();
        expect(status).toBe(false);
    }));
});
//# sourceMappingURL=volume.spec.js.map