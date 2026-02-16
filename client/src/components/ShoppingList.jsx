const CATEGORY_ICONS = {
    Dairy: '🥛', Produce: '🥬', Bakery: '🍞', Meat: '🥩',
    Snacks: '🍿', Beverages: '☕', Frozen: '🧊',
    Household: '🏠', 'Personal Care': '🧴', Other: '🛒',
};

export default function ShoppingList({ items, onDelete, onToggle, loading }) {
    if (loading) {
        return (
            <div className="flex flex-col gap-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-16 rounded-xl animate-pulse" style={{ background: 'var(--bg-card)' }} />
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-16 px-6 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px dashed var(--border)' }}>
                <p className="text-4xl mb-3">🎤</p>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Your list is empty
                </p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Say <strong>"Add milk"</strong> or browse the catalogue to get started
                </p>
            </div>
        );
    }

    // group items by category
    const grouped = {};
    items.forEach(item => {
        const cat = item.category || 'Other';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(item);
    });

    return (
        <div className="flex flex-col gap-4">
            {Object.entries(grouped).map(([category, catItems]) => (
                <div key={category} className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                    {/* category header */}
                    <div className="px-4 py-2 flex items-center gap-2" style={{ background: 'var(--bg-card)' }}>
                        <span className="text-sm">{CATEGORY_ICONS[category] || '📦'}</span>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                            {category}
                        </span>
                        <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>
                            {catItems.length}
                        </span>
                    </div>

                    {/* items */}
                    <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                        {catItems.map(item => (
                            <div
                                key={item._id}
                                className="flex items-center gap-3 px-4 py-3 transition-all duration-200 group"
                                style={{
                                    opacity: item.purchased ? 0.5 : 1,
                                    background: 'transparent',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                {/* checkbox */}
                                <button
                                    onClick={() => onToggle(item._id, !item.purchased)}
                                    className="flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer"
                                    style={{
                                        borderColor: item.purchased ? 'var(--success)' : 'var(--border)',
                                        background: item.purchased ? 'var(--success)' : 'transparent',
                                    }}
                                >
                                    {item.purchased && (
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>

                                {/* item details */}
                                <div className="flex-1 min-w-0">
                                    <p
                                        className="text-sm font-medium"
                                        style={{
                                            color: 'var(--text-primary)',
                                            textDecoration: item.purchased ? 'line-through' : 'none',
                                        }}
                                    >
                                        {item.name}
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        {item.quantity} {item.unit}
                                        {item.price > 0 && ` • $${item.price.toFixed(2)} each`}
                                    </p>
                                </div>

                                {/* price total for this item */}
                                {item.price > 0 && (
                                    <span className="text-xs font-semibold flex-shrink-0" style={{ color: 'var(--accent-light)' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                )}

                                {/* delete */}
                                <button
                                    onClick={() => onDelete(item._id)}
                                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                                    style={{ color: 'var(--error)' }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
