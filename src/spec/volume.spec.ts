import { assert } from "console";
import { getVolume, setVolume } from "..";

describe("volume", () => {
  let oldVolume = -1;
  const randomVolume = Math.floor(Math.random() * 100);

  it("gets volume", async () => {
    const volume = await getVolume();
    assert(volume !== -1);
    assert(!isNaN(volume));

    console.log(`volume: ${volume}`);
    oldVolume = volume;
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
