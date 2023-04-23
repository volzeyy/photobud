import { useState, useEffect } from "react";
import { Camera } from 'expo-camera';

export function useCameraPermission() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])

    return hasCameraPermission;
}