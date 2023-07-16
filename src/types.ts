export type GetVolume = () => Promise<number>;
export type SetVolume = (targetValue: number) => Promise<void>;

export interface PlatformImplementation {
  /**
   * Get current system volume
   * @returns System volume, from 0 to 100
   */
  getVolume: GetVolume;

  /**
   * Change system volume to target value
   * @param targetValue Target volume, from 0 to 100
   */
  setVolume: SetVolume;
}

export class SetVolumeError extends Error {}
export class GetVolumeError extends Error {}
