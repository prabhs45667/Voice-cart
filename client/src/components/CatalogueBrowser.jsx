import { useState, useEffect } from 'react';
import { getCatalogue } from '../services/api';

const CATEGORY_ICONS = {
    Dairy: '🥛', Produce: '🥬', Bakery: '🍞', Meat: '🥩',
    Snacks: '🍿', Beverages: '☕', Frozen: '🧊',
    Household: '🏠', 'Personal Care': '🧴', Other: '🛒',
};

export default function CatalogueBrowser({ onAdd, isOpen, onClose }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(false);

    const categories = ['All', 'Dairy', 'Produce', 'Bakery', 'Meat', 'Snacks', 'Beverages', 'Frozen', 'Household', 'Personal Care', 'Other'];

    useEffect(() => {
        if (isOpen) loadProducts();
    }, [isOpen, activeCategory]);

    async function loadProducts() {
        setLoading(true);
        try {
            const params = {};
            if (activeCategory !== 'All') params.category = activeCategory;
            if (search.trim()) params.search = search.trim();
            const data = await getCatalogue(params);
            setProducts(data);
        } catch (err) {
            console.error('Catalogue load failed:', err);
        } finally {
            setLoading(false);
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        loadProducts();
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
            <div
                className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden fade-up"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
            >
                {/* header */}
                <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div>
                        <h2 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                            📦 Product Catalogue
                        </h2>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                            {products.length} products available
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* search */}
                <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200"
                            style={{ background: 'var(--accent)', color: 'white' }}
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* category tabs */}
                <div className="px-5 py-2 border-b overflow-x-auto flex gap-1.5 scrollbar-thin" style={{ borderColor: 'var(--border)' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setSearch(''); }}
                            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200"
                            style={{
                                background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-card)',
                                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                                border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                            }}
                        >
                            {CATEGORY_ICONS[cat] || '📁'} {cat}
                        </button>
                    ))}
                </div>

                {/* product grid */}
                <div className="flex-1 overflow-y-auto p-5">
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="h-24 rounded-xl animate-pulse" style={{ background: 'var(--bg-card)' }} />
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-3xl mb-2">🔍</p>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No products found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    className="rounded-xl p-3 transition-all duration-200 cursor-pointer group"
                                    style={{ background: 'var(--bg-card)', border: '1px solid transparent' }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'var(--accent)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'transparent';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                    onClick={() => { onAdd(product.name, product.category, product.price); }}
                                >
                                    <div className="flex items-start justify-between mb-1.5">
                                        <span className="text-lg">{CATEGORY_ICONS[product.category] || '📦'}</span>
                                        <span className="text-xs font-bold px-1.5 py-0.5 rounded-md" style={{ background: 'var(--accent-glow)', color: 'var(--accent-light)' }}>
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium leading-snug mb-0.5" style={{ color: 'var(--text-primary)' }}>
                                        {product.name}
                                    </p>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        {product.category}
                                    </p>

                                    {/* add button overlay */}
                                    <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'var(--accent)', color: 'white' }}>
                                            + Add to List
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
