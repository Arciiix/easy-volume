Build with Microsoft Visual C++ (recommended):

1. Open a "x64 Native Tools Command Prompt for VS 2022" or run vcvars in cmd:

```bat
"%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
call "<installationPath>\VC\Auxiliary\Build\vcvars64.bat"
```

2. Compile:

- Link with dynamic runtime (requires VC++ Redistributable):

```bat
cl /nologo /EHsc /O2 /MD /Fe:volume.exe main.cpp ole32.lib
```

- Or link with static runtime (fully standalone binary):

```bat
cl /nologo /EHsc /O2 /MT /Fe:volume.exe main.cpp ole32.lib
```

Note: The resulting `volume.exe` should be placed alongside `index.js` under `dist/platforms/windows/` during publishing.
