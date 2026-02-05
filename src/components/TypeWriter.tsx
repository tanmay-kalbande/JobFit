import { useState, useEffect } from 'react';

interface TypeWriterProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
    enabled?: boolean;
}

export function TypeWriter({
    text,
    speed = 5,
    onComplete,
    enabled = true
}: TypeWriterProps) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // If animation is disabled, show full text immediately
        if (!enabled) {
            setDisplayedText(text);
            setIsComplete(true);
            return;
        }

        // Reset when text changes
        setDisplayedText('');
        setIsComplete(false);

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                // Add multiple characters per interval for faster streaming
                const charsToAdd = Math.min(3, text.length - currentIndex);
                setDisplayedText(text.slice(0, currentIndex + charsToAdd));
                currentIndex += charsToAdd;
            } else {
                clearInterval(interval);
                setIsComplete(true);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, enabled, onComplete]);

    return (
        <span className="typewriter-text">
            {displayedText}
            {!isComplete && <span className="typing-cursor" />}
        </span>
    );
}

// Hook for streaming sections of the resume
export function useStreamingResume() {
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamKey, setStreamKey] = useState(0);

    const startStreaming = () => {
        setIsStreaming(true);
        setStreamKey(prev => prev + 1);
    };

    const stopStreaming = () => {
        setIsStreaming(false);
    };

    return {
        isStreaming,
        streamKey,
        startStreaming,
        stopStreaming
    };
}
