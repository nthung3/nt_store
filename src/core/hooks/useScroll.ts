import React, { useEffect, useState } from 'react';

function useScroll() {
    const [Sticky, setSticky] = useState<boolean>(false);
    useEffect(() => {
        function onScroll() {
            if (window.scrollY >= 100) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        }
        window.addEventListener('scroll', onScroll);
        return window.addEventListener('scroll', onScroll);
        // if (scroll >= 150) console.log('hello');
    }, [Sticky]);
    return [Sticky, setSticky];
}

export default useScroll;
