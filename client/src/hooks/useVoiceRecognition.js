import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook that wraps the Web Speech API for voice recognition.
 * Handles browser compatibility, language switching, and interim results.
 */
export default function useVoiceRecognition() {
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [language, setLanguage] = useState('en-US');
    const [error, setError] = useState(null);
    const [isSupported, setIsSupported] = useState(true);
    const recognitionRef = useRef(null);

    useEffect(() => {
        // check if the browser actually supports speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setIsSupported(false);
            setError('Your browser does not support voice recognition. Try Chrome or Edge.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    final += result[0].transcript;
                } else {
                    interim += result[0].transcript;
                }
            }

            if (final) {
                setTranscript(final);
                setInterimTranscript('');
            } else {
                setInterimTranscript(interim);
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);

            // provide user-friendly error messages
            switch (event.error) {
                case 'not-allowed':
                    setError('Microphone access denied. Please allow microphone in your browser settings.');
                    break;
                case 'no-speech':
                    setError('No speech detected. Try speaking louder or closer to the mic.');
                    break;
                case 'network':
                    setError('Network error. Check your internet connection.');
                    break;
                case 'aborted':
                    // silently ignore — happens when recognition restarts or language changes
                    break;
                case 'audio-capture':
                    setError('Microphone is busy. Close other apps using the mic and try again.');
                    break;
                default:
                    setError(`Recognition error: ${event.error}`);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        // cleanup
        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.abort();
                } catch (e) {
                    // ignore
                }
            }
        };
    }, [language]);

    const startListening = useCallback(() => {
        if (!recognitionRef.current) return;

        setTranscript('');
        setInterimTranscript('');
        setError(null);

        try {
            recognitionRef.current.lang = language;
            recognitionRef.current.start();
        } catch (err) {
            // might already be running
            console.warn('Recognition start error:', err.message);
        }
    }, [language]);

    const stopListening = useCallback(() => {
        if (!recognitionRef.current) return;

        try {
            recognitionRef.current.stop();
        } catch (err) {
            console.warn('Recognition stop error:', err.message);
        }
    }, []);

    // reset transcript so the next voice command starts fresh
    const resetTranscript = useCallback(() => {
        setTranscript('');
        setInterimTranscript('');
    }, []);

    return {
        transcript,
        interimTranscript,
        isListening,
        language,
        setLanguage,
        error,
        isSupported,
        startListening,
        stopListening,
        resetTranscript,
    };
}
