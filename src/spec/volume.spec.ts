import { assert } from "console";
import { getVolume, setVolume } from "..";
import { SetVolumeError } from "../types";

describe("volume", () => {
  let oldVolume = -1;
  const randomVolume = Math.floor(Math.random() * 100);

  it("gets volume", async () => {
    const volume = await getVolume();
    assert(volume !== -1);
    assert(volume <= 100 && volume >= 0);
    assert(!isNaN(volume));

    console.log(`volume: ${volume}`);
    oldVolume = volume;
  });
  it("handles invalid volume above", async () => {
    expect(setVolume(110)).rejects.toThrow(SetVolumeError);
  });
  it("handles invalid volume below", async () => {
    expect(setVolume(-1)).rejects.toThrow(SetVolumeError);
  });
  it("sets volume without error", async () => {
    await setVolume(randomVolume);
  });
  it("sets volume properly", async () => {
    const newVolume = await getVolume();
    expect(newVolume).toBe(randomVolume);
  });
  it("sets volume back to normal", async () => {
    await setVolume(oldVolume);
  });
});
