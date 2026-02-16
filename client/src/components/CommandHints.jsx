import { useState } from 'react';

const COMMAND_EXAMPLES = [
    { icon: '➕', cmd: '"Add 2 bottles of milk"', desc: 'Add items with quantity' },
    { icon: '🗑️', cmd: '"Remove eggs"', desc: 'Remove an item' },
    { icon: '🔍', cmd: '"Search for snacks"', desc: 'Find products' },
    { icon: '🧹', cmd: '"Clear my list"', desc: 'Remove everything' },
    { icon: '🛒', cmd: '"I need 5 oranges"', desc: 'Natural language works too' },
    { icon: '🗣️', cmd: '"मुझे दूध चाहिए"', desc: 'Hindi voice support' },
];

export default function CommandHints({ onTryCommand }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className="rounded-xl overflow-hidden mb-5 transition-all duration-300"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
        >
            {/* toggle bar */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left cursor-pointer transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
                <span className="text-xs font-semibold flex items-center gap-2">
                    <span>💬</span> Voice Commands Guide
                </span>
                <svg
                    className="w-3.5 h-3.5 transition-transform duration-300"
                    style={{
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                        color: 'var(--text-muted)',
                    }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* expandable content */}
            <div
                className="transition-all duration-300 overflow-hidden"
                style={{
                    maxHeight: expanded ? '400px' : '0px',
                    opacity: expanded ? 1 : 0,
                }}
            >
                <div className="px-4 pb-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {COMMAND_EXAMPLES.map((ex, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-2.5 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group"
                                style={{ background: 'var(--bg-card)' }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'var(--bg-hover)';
                                    e.currentTarget.style.borderColor = 'var(--accent)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'var(--bg-card)';
                                    e.currentTarget.style.borderColor = 'transparent';
                                }}
                                onClick={() => onTryCommand && onTryCommand(ex.cmd.replace(/"/g, ''))}
                            >
                                <span className="text-sm mt-0.5 flex-shrink-0">{ex.icon}</span>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium truncate" style={{ color: 'var(--accent-light)' }}>
                                        {ex.cmd}
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        {ex.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs mt-3 px-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        <strong style={{ color: 'var(--text-secondary)' }}>Tip:</strong> Only products from our catalogue can be added.
                        Click any example above to try it, or say it with the mic button.
                    </p>
                </div>
            </div>
        </div>
    );
}
