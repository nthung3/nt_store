import React, { useEffect, useState } from 'react';

export const useCamera = () => {
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        // Check if screen recording is detected
        window.addEventListener('blur', () => {
            console.log('Screen recording detected');
            setIsRecording(true);
        });

        window.addEventListener('focus', () => {
            console.log('Screen recording stopped');
            setIsRecording(false);
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'F12') {
                console.log('F12 developer tools detected');
                window.location.replace('https://www.example.com');
            }
        });
    }, []);
    return [isRecording, setIsRecording];
};
