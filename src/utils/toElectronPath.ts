/**
 * Use this function for executing any files, e.g. volume.exe in Windows implementation (excluding system commands, e.g. amixer on Linux)
 *
 * Electron is known for having production-build specific problem with paths
 * It packs the app into asar archive, so when e.g. childProcess.spawn tried to access a file, it doesn't exist (it's inside the archive)
 * To fix that, Electron automatically unpacks modules that use fs or childProcess modules
 * But that's not enough - those modules have to use their unpacked files
 * To achieve that, replace "app.asar" with "app.asar.unpacked" in the path
 * @param path
 */
export default function toElectronPath(path: string): string {
  return path.replace("app.asar", "app.asar.unpacked");
}
