export type GetVolume = () => Promise<number>;
export type SetVolume = (targetValue: number) => Promise<void>;
export type GetMute = () => Promise<boolean>;
export type SetMute = (isMuted: boolean) => Promise<void>;
export type ToggleMute = () => Promise<boolean>;

export interface VolumeControl extends PlatformImplementation {
  /**
   * Toggle mute state
   * @returns Current (new) mute state (true == muted, false == unmuted)
   */
  toggleMute: ToggleMute;
}

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

  /**
   * Get current mute status (whether the system audio is muted or not)
   * @returns Whether the system audio is muted, i.e. true == muted, false == unmuted
   */
  getMute: GetMute;

  /**
   * Either mute or unmute system audio
   * @param isMuted Whether to mute or unmute the system audio
   */
  setMute: SetMute;
}

export class SetVolumeError extends Error {}
export class GetVolumeError extends Error {}
