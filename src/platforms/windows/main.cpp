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

bool IsSystemAudioMuted()
{
    CoInitialize(nullptr);

    IMMDeviceEnumerator *pEnumerator = nullptr;
    IMMDevice *pDevice = nullptr;
    IAudioEndpointVolume *pEndpointVolume = nullptr;

    // Create the device enumerator
    HRESULT hr = CoCreateInstance(__uuidof(MMDeviceEnumerator), nullptr, CLSCTX_ALL, __uuidof(IMMDeviceEnumerator), reinterpret_cast<void **>(&pEnumerator));
    if (FAILED(hr))
    {
        CoUninitialize();
        return false;
    }

    // Get the default audio output device
    hr = pEnumerator->GetDefaultAudioEndpoint(eRender, eConsole, &pDevice);
    if (FAILED(hr))
    {
        pEnumerator->Release();
        CoUninitialize();
        return false;
    }

    // Activate the audio endpoint volume control interface
    hr = pDevice->Activate(__uuidof(IAudioEndpointVolume), CLSCTX_ALL, nullptr, reinterpret_cast<void **>(&pEndpointVolume));
    if (FAILED(hr))
    {
        pDevice->Release();
        pEnumerator->Release();
        CoUninitialize();
        return false;
    }

    BOOL isMuted = FALSE;
    // Get the mute status
    hr = pEndpointVolume->GetMute(&isMuted);
    if (FAILED(hr))
    {
        pEndpointVolume->Release();
        pDevice->Release();
        pEnumerator->Release();
        CoUninitialize();
        return false;
    }

    // Release the COM objects
    pEndpointVolume->Release();
    pDevice->Release();
    pEnumerator->Release();
    CoUninitialize();

    return (isMuted == TRUE);
}

void MuteSystemAudio()
{
    CoInitialize(nullptr);

    IMMDeviceEnumerator *pEnumerator = nullptr;
    IMMDevice *pDevice = nullptr;
    IAudioEndpointVolume *pEndpointVolume = nullptr;

    // Create the device enumerator
    HRESULT hr = CoCreateInstance(__uuidof(MMDeviceEnumerator), nullptr, CLSCTX_ALL, __uuidof(IMMDeviceEnumerator), reinterpret_cast<void **>(&pEnumerator));
    if (FAILED(hr))
    {
        CoUninitialize();
        return;
    }

    // Get the default audio output device
    hr = pEnumerator->GetDefaultAudioEndpoint(eRender, eConsole, &pDevice);
    if (FAILED(hr))
    {
        pEnumerator->Release();
        CoUninitialize();
        return;
    }

    // Activate the audio endpoint volume control interface
    hr = pDevice->Activate(__uuidof(IAudioEndpointVolume), CLSCTX_ALL, nullptr, reinterpret_cast<void **>(&pEndpointVolume));
    if (FAILED(hr))
    {
        pDevice->Release();
        pEnumerator->Release();
        CoUninitialize();
        return;
    }

    // Mute the system audio
    hr = pEndpointVolume->SetMute(TRUE, nullptr);
    if (FAILED(hr))
    {
        pEndpointVolume->Release();
        pDevice->Release();
        pEnumerator->Release();
        CoUninitialize();
        return;
    }

    // Release the COM objects
    pEndpointVolume->Release();
    pDevice->Release();
    pEnumerator->Release();
    CoUninitialize();
}

void UnmuteSystemAudio()
{
    CoInitialize(nullptr);

    IMMDeviceEnumerator *pEnumerator = nullptr;
    IMMDevice *pDevice = nullptr;
    IAudioEndpointVolume *pEndpointVolume = nullptr;

    // Create the device enumerator
    HRESULT hr = CoCreateInstance(__uuidof(MMDeviceEnumerator), nullptr, CLSCTX_ALL, __uuidof(IMMDeviceEnumerator), reinterpret_cast<void **>(&pEnumerator));
    if (FAILED(hr))
    {
        CoUninitialize();
        return;
    }

    // Get the default audio output device
    hr = pEnumerator->GetDefaultAudioEndpoint(eRender, eConsole, &pDevice);
    if (FAILED(hr))
    {
        pEnumerator->Release();
        CoUninitialize();
        return;
    }

    // Activate the audio endpoint volume control interface
    hr = pDevice->Activate(__uuidof(IAudioEndpointVolume), CLSCTX_ALL, nullptr, reinterpret_cast<void **>(&pEndpointVolume));
    if (FAILED(hr))
    {
        pDevice->Release();
        pEnumerator->Release();
        CoUninitialize();
        return;
    }

    // Unmute the system audio
    hr = pEndpointVolume->SetMute(FALSE, nullptr);
    if (FAILED(hr))
    {
        pEndpointVolume->Release();
        pDevice->Release();
        pEnumerator->Release();
        CoUninitialize();
        return;
    }

    // Release the COM objects
    pEndpointVolume->Release();
    pDevice->Release();
    pEnumerator->Release();
    CoUninitialize();
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
    else if (command == "mute_status")
    {
        bool isMuted = IsSystemAudioMuted();
        std::cout << (isMuted == FALSE ? "0" : "1");
    }
    else if (command == "mute")
    {
        MuteSystemAudio();
    }
    else if (command == "unmute")
    {
        UnmuteSystemAudio();
    }
    else
    {
        std::cout << "Unknown command: " << command << std::endl;
        return 1;
    }

    return 0;
}
