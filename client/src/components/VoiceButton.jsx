import { useState } from 'react';

const LANGUAGES = [
    { code: 'en-US', label: 'English', flag: '🇺🇸' },
    { code: 'hi-IN', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'es-ES', label: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', label: 'Français', flag: '🇫🇷' },
];

export default function VoiceButton({
    isListening,
    onStart,
    onStop,
    language,
    onLanguageChange,
    interimTranscript,
    error,
    isSupported,
}) {
    const [showLangMenu, setShowLangMenu] = useState(false);

    if (!isSupported) {
        return (
            <div className="text-center py-6">
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-red-400 text-sm">
                        ⚠️ Voice recognition is not supported in your browser.
                        <br />
                        Please use <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>.
                    </p>
                </div>
            </div>
        );
    }

    const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    return (
        <div className="flex flex-col items-center gap-4 py-6">
            {/* language selector */}
            <div className="relative">
                <button
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors duration-200"
                    style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                >
                    <span>{currentLang.flag}</span>
                    <span>{currentLang.label}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {showLangMenu && (
                    <div
                        className="absolute top-full mt-1 w-40 rounded-lg shadow-xl z-10 overflow-hidden"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                    >
                        {LANGUAGES.map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    onLanguageChange(lang.code);
                                    setShowLangMenu(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors duration-150"
                                style={{
                                    color: language === lang.code ? 'var(--accent-light)' : 'var(--text-secondary)',
                                    background: language === lang.code ? 'var(--accent-glow)' : 'transparent',
                                }}
                                onMouseEnter={e => e.target.style.background = 'var(--bg-hover)'}
                                onMouseLeave={e => e.target.style.background = language === lang.code ? 'var(--accent-glow)' : 'transparent'}
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* mic button */}
            <button
                onClick={isListening ? onStop : onStart}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isListening ? 'mic-active' : ''
                    }`}
                style={{
                    background: isListening
                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                        : 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                    boxShadow: isListening
                        ? '0 0 30px rgba(239, 68, 68, 0.4)'
                        : '0 4px 20px var(--accent-glow)',
                }}
                title={isListening ? 'Click to stop' : 'Click to speak'}
            >
                {isListening ? (
                    // stop icon
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                ) : (
                    // mic icon
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 15a3 3 0 003-3V5a3 3 0 00-6 0v7a3 3 0 003 3z" />
                    </svg>
                )}
            </button>

            {/* status text */}
            <div className="text-center min-h-[48px]">
                {isListening && (
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-1 h-6">
                            <span className="wave-bar" />
                            <span className="wave-bar" />
                            <span className="wave-bar" />
                            <span className="wave-bar" />
                            <span className="wave-bar" />
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Listening... speak now
                        </p>
                    </div>
                )}

                {!isListening && !error && (
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        Tap the mic and say something like <br />
                        <span style={{ color: 'var(--accent-light)' }}>"Add 2 bottles of milk"</span>
                    </p>
                )}

                {/* show what's being heard in real-time */}
                {interimTranscript && (
                    <p className="text-sm mt-2 px-4 py-2 rounded-lg italic" style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)' }}>
                        "{interimTranscript}"
                    </p>
                )}

                {error && (
                    <p className="text-sm mt-1 text-red-400">{error}</p>
                )}
            </div>
        </div>
    );
}
