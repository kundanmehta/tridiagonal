'use client';
import { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            if (documentHeight > windowHeight) {
                const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
                setScrollProgress(Math.min(progress, 100));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.05)',
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    width: `${scrollProgress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #00AEEF 0%, #00FFCC 100%)',
                    boxShadow: '0 0 10px rgba(0, 255, 204, 0.5)',
                    transition: 'width 0.1s ease-out',
                }}
            />
        </div>
    );
}
