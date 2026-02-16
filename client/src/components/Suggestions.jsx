export default function Suggestions({ suggestions, onAdd, loading }) {
    if (loading) {
        return (
            <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span>💡</span> Smart Suggestions
                </h3>
                <div className="flex flex-col gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-14 rounded-lg animate-pulse" style={{ background: 'var(--bg-card)' }} />
                    ))}
                </div>
            </div>
        );
    }

    if (!suggestions || suggestions.length === 0) {
        return null;
    }

    return (
        <div className="rounded-xl p-4 fade-up" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span>💡</span> Smart Suggestions
            </h3>

            <div className="flex flex-col gap-2">
                {suggestions.map((s, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group cursor-pointer"
                        style={{ background: 'var(--bg-card)', border: '1px solid transparent' }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.background = 'var(--bg-hover)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.background = 'var(--bg-card)';
                        }}
                        onClick={() => onAdd(s.item, s.category, s.price)}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                                    {s.item}
                                </p>
                                {s.price > 0 && (
                                    <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--accent-glow)', color: 'var(--accent-light)' }}>
                                        ${s.price.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                                {s.reason}
                            </p>
                        </div>

                        {/* plus button */}
                        <div
                            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                            style={{ background: 'var(--accent-glow)', color: 'var(--accent-light)' }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
