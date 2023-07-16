#include <iostream>
#include <string>
#include <windows.h>
#include <mmdeviceapi.h>
#include <endpointvolume.h>
#pragma comment(lib, "Ole32.lib")

float GetSystemVolume()
{
    HRESULT hr;

    // Initialize COM
    CoInitialize(NULL);

    // Create the device enumerator
    IMMDeviceEnumerator *deviceEnumerator = NULL;
    hr = CoCreateInstance(__uuidof(MMDeviceEnumerator), NULL, CLSCTX_INPROC_SERVER, __uuidof(IMMDeviceEnumerator), (LPVOID *)&deviceEnumerator);
    if (FAILED(hr))
    {
        return -1.0f;
    }

    // Get the default audio endpoint
    IMMDevice *defaultDevice = NULL;
    hr = deviceEnumerator->GetDefaultAudioEndpoint(eRender, eConsole, &defaultDevice);
    deviceEnumerator->Release();
    if (FAILED(hr))
    {
        return -1.0f;
    }

    // Activate the audio endpoint volume interface
    IAudioEndpointVolume *endpointVolume = NULL;
    hr = defaultDevice->Activate(__uuidof(IAudioEndpointVolume), CLSCTX_INPROC_SERVER, NULL, (LPVOID *)&endpointVolume);
    defaultDevice->Release();
    if (FAILED(hr))
    {
        return -1.0f;
    }

    // Get the master volume level
    float volume = 0.0f;
    hr = endpointVolume->GetMasterVolumeLevelScalar(&volume);
    endpointVolume->Release();
    CoUninitialize();

    if (FAILED(hr))
    {
        return -1.0f;
    }

    return volume;
}

void SetSystemVolume(float volume)
{
    HRESULT hr;

    // Initialize COM
    CoInitialize(NULL);

    // Create the device enumerator
    IMMDeviceEnumerator *deviceEnumerator = NULL;
    hr = CoCreateInstance(__uuidof(MMDeviceEnumerator), NULL, CLSCTX_INPROC_SERVER, __uuidof(IMMDeviceEnumerator), (LPVOID *)&deviceEnumerator);
    if (FAILED(hr))
    {
        return;
    }

    // Get the default audio endpoint
    IMMDevice *defaultDevice = NULL;
    hr = deviceEnumerator->GetDefaultAudioEndpoint(eRender, eConsole, &defaultDevice);
    deviceEnumerator->Release();
    if (FAILED(hr))
    {
        return;
    }

    // Activate the audio endpoint volume interface
    IAudioEndpointVolume *endpointVolume = NULL;
    hr = defaultDevice->Activate(__uuidof(IAudioEndpointVolume), CLSCTX_INPROC_SERVER, NULL, (LPVOID *)&endpointVolume);
    defaultDevice->Release();
    if (FAILED(hr))
    {
        return;
    }

    // Set the master volume level
    hr = endpointVolume->SetMasterVolumeLevelScalar(volume, NULL);
    endpointVolume->Release();
    CoUninitialize();

    if (FAILED(hr))
    {
        return;
    }
}

int main(int argc, char *argv[])
{
    if (argc < 2)
    {
        std::cout << "Usage: volume.exe <command> [value]" << std::endl;
        return 1;
    }

    std::string command = argv[1];

    if (command == "get")
    {
        float volumeLevel = GetSystemVolume();
        std::cout << static_cast<int>(volumeLevel * 100);
    }
    else if (command == "set")
    {
        if (argc < 3)
        {
            std::cout << "Missing value. Usage: volume.exe set <value>" << std::endl;
            return 1;
        }

        int volumeLevel = std::stoi(argv[2]);
        if (volumeLevel < 0 || volumeLevel > 100)
        {
            std::cout << "Invalid value. Volume level must be between 0 and 100." << std::endl;
            return 1;
        }

        SetSystemVolume(static_cast<float>(volumeLevel) / 100.0);
        std::cout << volumeLevel;
    }
    else
    {
        std::cout << "Unknown command: " << command << std::endl;
        return 1;
    }

    return 0;
}
