export default function SearchResults({ results, onAdd, onClose, query }) {
    if (!results || results.length === 0) {
        return (
            <div className="rounded-xl p-4 fade-up" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent)', borderStyle: 'dashed' }}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--accent-light)' }}>
                        <span>🔍</span> Search: "{query}"
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg transition-colors duration-200 cursor-pointer"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    No matching products found in catalogue. Try a different search term.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl p-4 fade-up" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent)' }}>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: 'var(--accent-light)' }}>
                    <span>🔍</span> Results for "{query}"
                    <span className="text-xs font-normal px-1.5 py-0.5 rounded-full" style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
                        {results.length} found
                    </span>
                </h3>
                <button
                    onClick={onClose}
                    className="p-1 rounded-lg transition-colors duration-200 cursor-pointer"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {results.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer group"
                        style={{ background: 'var(--bg-card)' }}
                        onClick={() => onAdd(item.name || item.item, item.category, item.price)}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                                    {item.name || item.item}
                                </p>
                                {item.price > 0 && (
                                    <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--accent-glow)', color: 'var(--accent-light)' }}>
                                        ${item.price.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            {item.category && (
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                    {item.category}
                                </p>
                            )}
                        </div>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'var(--accent)', color: 'white' }}>
                            + Add
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
