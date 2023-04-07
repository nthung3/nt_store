import { useEffect, useState } from 'react';

function LoadedImage(src: string) {
    const [sourceLoaded, setSourceLoaded] = useState<string>('');

    useEffect(() => {
        const img = new Image();

        img.src = src;
        img.onload = () => setSourceLoaded(src);
    }, [src]);

    return sourceLoaded;
}

export default LoadedImage;
