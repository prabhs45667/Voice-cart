import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import useVoiceRecognition from './hooks/useVoiceRecognition';
import LoginPage from './components/LoginPage';
import {
    getItems, addItem, deleteItem, updateItem, deleteItemByName,
    processVoiceCommand, getCatalogue, getSuggestions, getSubstitutes,
} from './services/api';

const CATEGORY_DATA = {
    All: { icon: '🏪', label: 'All' },
    Dairy: { icon: '🥛', label: 'Dairy' },
    Vegetables: { icon: '🥬', label: 'Vegetables' },
    Fruits: { icon: '🍎', label: 'Fruits' },
    Grocery: { icon: '🌾', label: 'Grocery & Staples' },
    'Masala & Spices': { icon: '🫙', label: 'Masala & Spices' },
    Bakery: { icon: '🍞', label: 'Bakery' },
    Snacks: { icon: '🍟', label: 'Snacks & Namkeen' },
    Beverages: { icon: '☕', label: 'Beverages' },
    Household: { icon: '🏠', label: 'Household' },
    'Personal Care': { icon: '🧴', label: 'Personal Care' },
};

const VOICE_TIPS = [
    { icon: '🛒', text: '<strong>"Add 1 kg aloo"</strong> — add with unit' },
    { icon: '🗑️', text: '<strong>"Remove eggs"</strong> — remove item' },
    { icon: '🧹', text: '<strong>"Clear my list"</strong> — empty cart' },
    { icon: '🔍', text: '<strong>"Search paneer"</strong> — find products' },
    { icon: '🇮🇳', text: '<strong>"मुझे दूध चाहिए"</strong> — Hindi works!' },
    { icon: '⚖️', text: '<strong>"Half kg tomato"</strong> — fraction qty' },
    { icon: '🥚', text: '<strong>"1 dozen eggs"</strong> — dozen unit' },
    { icon: '📦', text: '<strong>"2 packet Maggi"</strong> — packet unit' },
];

// Helper for dynamic images
function getItemImage(product) {
    if (product.image) return product.image;

    // Use loremflickr for real images based on tags
    // fallback to name/category if tags missing
    let keywords = 'grocery';
    if (product.tags && product.tags.length > 0) {
        keywords = product.tags[0];
    } else {
        const nameKey = product.name.split('(')[0].trim().split(' ')[0];
        keywords = `${product.category},${nameKey}`;
    }
    // minimal UI size
    return `https://loremflickr.com/320/240/${encodeURIComponent(keywords)}/all`;
}

export default function App() {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('vc_current_user');
        return saved ? JSON.parse(saved) : null;
    });
    const [items, setItems] = useState([]);
    const [catalogue, setCatalogue] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchResults, setSearchResults] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [catLoading, setCatLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [manualInput, setManualInput] = useState('');
    const [mobileCartOpen, setMobileCartOpen] = useState(false);
    const [headerSearch, setHeaderSearch] = useState('');

    const {
        transcript, interimTranscript, isListening, language, setLanguage,
        error: voiceError, isSupported, startListening, stopListening, resetTranscript,
    } = useVoiceRecognition();

    useEffect(() => { if (user) { loadItems(); loadCatalogue(); loadSuggestions(); } }, [user]);
    useEffect(() => { if (user) loadCatalogue(); }, [activeCategory]);
    useEffect(() => { if (transcript && !isListening) handleVoiceCommand(transcript); }, [transcript, isListening]);

    async function loadItems() {
        try { setLoading(true); setItems(await getItems()); } catch (e) { toast.error(`List Error: ${e.message}`); console.error(e); } finally { setLoading(false); }
    }
    async function loadCatalogue() {
        try {
            setCatLoading(true);
            const params = {};
            if (activeCategory !== 'All') params.category = activeCategory;
            setCatalogue(await getCatalogue(params));
        } catch (e) { console.error(e); } finally { setCatLoading(false); }
    }
    async function loadSuggestions() {
        try { setSuggestions(await getSuggestions()); } catch (e) { console.error(e); }
    }

    // ═══ VOICE COMMAND ═══

    function speak(text, onEnd) {
        if (!text) { if (onEnd) onEnd(); return; }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (onEnd) utterance.onend = onEnd;
        window.speechSynthesis.speak(utterance);
    }

    async function handleVoiceCommand(text) {
        setProcessing(true);
        toast.loading(`Processing: "${text}"`, { id: 'proc' });
        try {
            const p = await processVoiceCommand(text);
            if (p.translatedText && p.translatedText !== text) {
                toast(`🌐 Translated: "${p.translatedText}"`, { id: 'translate', duration: 3000, icon: '🇮🇳' });
            }

            // 1. STOP intent
            if (p.intent === 'stop') {
                toast.success('Shopping session ended', { id: 'proc' });
                speak('Okay, stopping. Let me know if you need anything else.');
                stopListening();
                setProcessing(false);
                resetTranscript();
                return;
            }

            // 2. CHAT intent (out of context)
            if (p.intent === 'chat') {
                toast('Please keep to shopping items', { icon: '🛒', id: 'proc' });
                speak("That’s out of context for this shopping task, please give me a shopping command.", () => {
                    setProcessing(false); resetTranscript(); startListening();
                });
                return;
            }

            let responseMsg = '';

            switch (p.intent) {
                case 'add':
                    responseMsg = await doAdd(p);
                    loadSuggestions();
                    break;
                case 'remove':
                    responseMsg = await doRemove(p);
                    break;
                case 'search':
                    await doSearch(p.item, p.maxPrice);
                    responseMsg = p.maxPrice
                        ? `Showing results for ${p.item} under ₹${p.maxPrice}`
                        : `Showing results for ${p.item}`;
                    toast.success(responseMsg, { id: 'proc' });
                    break;
                case 'clear':
                    responseMsg = await doClear();
                    break;
                case 'incomplete':
                    responseMsg = p.clarification || 'Which item?';
                    toast.error(responseMsg, { id: 'proc', duration: 5000 });
                    break;
                case 'not_found':
                    responseMsg = `Sorry, I couldn't find ${p.item} in the catalogue.`;
                    toast.error(responseMsg, { id: 'proc', duration: 5000 });
                    if (p.substitutes && p.substitutes.length > 0) {
                        toast(t => (
                            <div style={{ fontSize: 13 }}>
                                <b>Did you mean?</b>
                                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                                    {p.substitutes.map((s, i) => (
                                        <button key={i} onClick={() => { toast.dismiss(t.id); doAddFromGrid({ name: s.item, category: '', price: s.price, defaultUnit: '' }); }}
                                            style={{ padding: '4px 10px', borderRadius: 16, background: '#e8f5e9', color: '#0c831f', fontSize: 12, fontWeight: 600, border: '1px solid #0c831f', cursor: 'pointer' }}>
                                            + {s.item} ₹{s.price}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ), { duration: 8000 });
                    }
                    break;
                default:
                    if (p.item) {
                        responseMsg = await doAdd(p);
                        loadSuggestions();
                    } else {
                        responseMsg = "I didn't understand that.";
                        toast.error(responseMsg, { id: 'proc' });
                    }
            }

            // Loop: Confirm action -> Prompt "What next?" -> Listen again
            if (responseMsg) {
                const prompt = ["What next?", "Anything else?", "Go ahead.", "Next item?"][Math.floor(Math.random() * 4)];
                speak(`${responseMsg}. ${prompt}`, () => {
                    setProcessing(false);
                    resetTranscript();
                    startListening();
                });
            } else {
                setProcessing(false); resetTranscript(); startListening();
            }

        } catch {
            toast.error('Something went wrong', { id: 'proc' });
            speak('Something went wrong. Please try again.', () => {
                setProcessing(false); resetTranscript(); startListening();
            });
        }
    }

    async function doAdd(p) {
        try {
            const newItem = await addItem({ name: p.item, quantity: p.quantity || 1, unit: p.unit || 'piece', category: p.category, price: p.price || 0 });
            setItems(prev => { const ex = prev.find(i => i._id === newItem._id); return ex ? prev.map(i => i._id === newItem._id ? newItem : i) : [newItem, ...prev]; });
            const msg = `Added ${p.quantity || 1} ${p.unit || ''} ${newItem.name}`;
            toast.success(`✅ ${msg}`, { id: 'proc' });
            return msg;
        } catch (err) {
            if (err.response?.data?.error === 'not_in_catalogue') {
                toast.error(`"${p.item}" not in catalogue`, { id: 'proc', duration: 5000 });
                return `Sorry, ${p.item} is not in the catalogue.`;
            } else {
                toast.error(`Failed to add "${p.item}"`, { id: 'proc' });
                return `Failed to add ${p.item}.`;
            }
        }
    }

    async function doAddFromGrid(product) {
        try {
            const newItem = await addItem({ name: product.name, quantity: 1, unit: product.defaultUnit || 'piece', category: product.category, price: product.price || 0 });
            setItems(prev => { const ex = prev.find(i => i._id === newItem._id); return ex ? prev.map(i => i._id === newItem._id ? newItem : i) : [newItem, ...prev]; });
            toast.success(`✅ Added ${product.name}`);
        } catch { toast.error(`Failed to add "${product.name}"`); }
    }

    async function doRemove(itemOrName) {
        const name = typeof itemOrName === 'string' ? itemOrName : itemOrName.item;
        const quantity = (typeof itemOrName === 'object' && itemOrName.quantity) ? itemOrName.quantity : 0;

        try {
            if (quantity > 0) {
                const res = await axios.post('/api/items/remove', { name, quantity });
                setItems(prev => {
                    if (res.data.action === 'deleted') return prev.filter(i => i._id !== res.data.item._id);
                    return prev.map(i => i._id === res.data.item._id ? res.data.item : i);
                });
                const msg = quantity > 0 ? `Removed ${quantity} from ${name}` : `Removed ${name}`;
                toast.success(`🗑️ ${msg}`, { id: 'proc' });
                return msg;
            } else {
                await deleteItemByName(name);
                setItems(prev => prev.filter(i => i.name.toLowerCase() !== name.toLowerCase()));
                toast.success(`🗑️ Removed ${name}`, { id: 'proc' });
                return `Removed ${name}`;
            }
        } catch {
            toast.error(`Could not remove ${name}`, { id: 'proc' });
            return `Could not remove ${name}.`;
        }
    }

    async function doClear() {
        try {
            // this is a bit heavy, usually we'd have a clear endpoint
            for (const item of items) await deleteItem(item._id);
            setItems([]);
            toast.success('Cleared list', { id: 'proc' });
            return 'List cleared.';
        } catch { return 'Failed to clear list.'; }
    }

    async function doSearch(query, maxPrice = null) {
        setSearchQuery(query);
        const q = query.toLowerCase();
        let results = catalogue.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.tags.some(t => t.includes(q)) ||
            p.category.toLowerCase().includes(q)
        );

        if (maxPrice) {
            results = results.filter(p => p.price <= maxPrice);
        }

        setSearchResults(results);

        if (results.length > 0) {
            const categories = [...new Set(results.map(r => r.category))];
            const related = catalogue.filter(p =>
                categories.includes(p.category) &&
                !results.find(r => r.id === p.id)
            ).sort(() => 0.5 - Math.random()).slice(0, 4);
            setRecommendations(related);
        } else {
            setRecommendations([]);
        }
    }

    async function doDelete(id) { try { await deleteItem(id); setItems(prev => prev.filter(i => i._id !== id)); } catch { toast.error('Remove failed'); } }
    async function doToggle(id, purchased) { try { const u = await updateItem(id, { purchased }); setItems(prev => prev.map(i => i._id === id ? u : i)); } catch { } }
    async function doUpdateQty(id, qty) { if (qty < 1) { doDelete(id); return; } try { const u = await updateItem(id, { quantity: qty }); setItems(prev => prev.map(i => i._id === id ? u : i)); } catch { } }

    function handleSubmit(e) { e.preventDefault(); if (manualInput.trim()) { handleVoiceCommand(manualInput.trim()); setManualInput(''); } }
    function handleHeaderSearch(e) { e.preventDefault(); if (headerSearch.trim()) { doSearch(headerSearch.trim()); setHeaderSearch(''); } }

    function cartQty(name) {
        const i = items.find(x => x.name.toLowerCase() === name.toLowerCase());
        return i ? { qty: i.quantity, id: i._id } : null;
    }

    function handleLogout() { localStorage.removeItem('vc_current_user'); setUser(null); }

    const totalItems = items.length;
    const purchased = items.filter(i => i.purchased).length;
    const totalPrice = items.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
    // calculate total savings from MRP vs price
    const totalSavings = items.reduce((s, i) => {
        const catItem = catalogue.find(c => c.name.toLowerCase() === i.name.toLowerCase());
        if (catItem && catItem.mrp > catItem.price) return s + (catItem.mrp - catItem.price) * (i.quantity || 1);
        return s;
    }, 0);

    // ═══ LOGIN SCREEN ═══
    if (!user) return <LoginPage onLogin={setUser} />;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Toaster position="top-center" toastOptions={{ style: { background: '#fff', color: '#1a1a2e', border: '1px solid #e5e7eb', fontSize: '13px', fontWeight: 500, borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }} />

            {/* ═══ HEADER ═══ */}
            <header className="app-header">
                <div className="header-inner">
                    <div className="header-logo">
                        <div className="header-logo-icon">🛒</div>
                        <div className="header-logo-text">
                            <h1>VoiceCart</h1>
                            <p>Voice-Powered Grocery</p>
                        </div>
                    </div>

                    <div className="header-search">
                        <span className="header-search-icon">🔍</span>
                        <form onSubmit={handleHeaderSearch}>
                            <input type="text" placeholder="Search products..." value={headerSearch} onChange={e => setHeaderSearch(e.target.value)} />
                        </form>
                    </div>

                    <div className="header-actions">
                        <button className="header-icon-btn" title="Rupee">₹</button>
                        <button className="header-icon-btn" title="Offers">🏷️</button>
                        <button className="cart-btn" onClick={() => setMobileCartOpen(!mobileCartOpen)}>
                            🛒 ₹{totalPrice.toFixed(0)}
                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </button>
                        <button className="header-user-btn" onClick={handleLogout} title="Logout">
                            <span className="header-user-avatar">👤</span>
                            {user.name?.split(' ')[0]}
                        </button>
                    </div>
                </div>
            </header>

            {/* ═══ CATEGORY STRIP ═══ */}
            <nav className="category-strip">
                <div className="category-strip-inner">
                    {Object.entries(CATEGORY_DATA).map(([key, val]) => (
                        <button key={key} className={`category-chip ${activeCategory === key ? 'active' : ''}`}
                            onClick={() => { setActiveCategory(key); setSearchResults(null); }}>
                            {val.icon} {val.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* ═══ MAIN LAYOUT ═══ */}
            <div className="app-main">
                <div className="main-content">

                    {/* ── VOICE + TIPS SECTION ── */}
                    <div className="voice-section">
                        {/* Voice card — LEFT */}
                        <div className="voice-card">
                            <button
                                className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
                                onClick={isListening ? stopListening : startListening}
                                disabled={!isSupported}
                            >
                                🎤
                            </button>
                            <p className="voice-card-label">
                                {isListening ? '🔴 Listening...' : 'Tap to speak'}
                            </p>
                            <div className="voice-lang-toggle">
                                {[{ code: 'en-US', label: '🇬🇧 EN' }, { code: 'hi-IN', label: '🇮🇳 HI' }].map(l => (
                                    <button key={l.code} className={`voice-lang-btn ${language === l.code ? 'active' : ''}`}
                                        onClick={() => setLanguage(l.code)}>
                                        {l.label}
                                    </button>
                                ))}
                            </div>
                            {voiceError && <p style={{ fontSize: 10, opacity: 0.8, marginTop: 6 }}>⚠️ {voiceError}</p>}
                        </div>

                        {/* Tips card — RIGHT */}
                        <div className="tips-card">
                            <h3>🎯 How to use Voice Commands</h3>
                            <div className="tips-grid">
                                {VOICE_TIPS.map((tip, i) => (
                                    <div key={i} className="tip-item" onClick={() => {
                                        const clean = tip.text.replace(/<[^>]+>/g, '').replace(/"/g, '').split('—')[0].trim();
                                        setManualInput(clean);
                                    }}>
                                        <span className="tip-icon">{tip.icon}</span>
                                        <span className="tip-text" dangerouslySetInnerHTML={{ __html: tip.text }} />
                                    </div>
                                ))}
                            </div>
                            {/* Text input */}
                            <form onSubmit={handleSubmit} className="voice-input-bar">
                                <input type="text" value={manualInput} onChange={e => setManualInput(e.target.value)}
                                    placeholder='Type: "Add 1 kg aloo" or "मुझे दूध चाहिए"' />
                                <button type="submit" disabled={!manualInput.trim() || processing}>Send</button>
                            </form>
                            {interimTranscript && <p className="interim-text">"{interimTranscript}"</p>}
                        </div>
                    </div>

                    {/* Processing bar */}
                    {/* Frequently Bought suggestions */}
                    {suggestions.length > 0 && !searchResults && (
                        <div style={{ background: '#fff', borderRadius: 16, padding: '14px 18px', marginBottom: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }} className="fade-up">
                            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>💡 Frequently Bought</h4>
                            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                                {suggestions.map((s, i) => (
                                    <button key={i} onClick={() => doAddFromGrid({ name: s.item, category: s.category, price: s.price, defaultUnit: '' })} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 12, background: 'linear-gradient(135deg,#f0fdf4,#ecfdf5)', border: '1px solid #c6f0c2', fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'left', minWidth: 120, transition: 'all 0.2s' }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'none'}>
                                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{s.item}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.reason}</div>
                                        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand)', marginTop: 2 }}>₹{s.price}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {processing && (
                        <div className="processing-bar fade-up">
                            <div className="processing-spinner" />
                            <span className="processing-text">Processing your command...</span>
                        </div>
                    )}

                    {/* Search results */}
                    {searchResults !== null && (
                        <div className="search-results fade-up" style={{ marginBottom: 20 }}>
                            <div className="search-results-header">
                                <h3>🔍 Results for "{searchQuery}" ({searchResults.length})</h3>
                                <button onClick={() => { setSearchResults(null); setSearchQuery(''); setRecommendations([]); }} style={{ fontSize: 18, color: 'var(--text-muted)', cursor: 'pointer', background: 'none' }}>✕</button>
                            </div>

                            {recommendations.length > 0 && (
                                <div style={{ marginBottom: 20, background: '#fff', borderRadius: 16, padding: '14px 18px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                                    <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: 'var(--text-primary)' }}>You might also like</h4>
                                    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                                        {recommendations.map((p, i) => (
                                            <button key={i} onClick={() => doAddFromGrid(p)} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 12, background: 'linear-gradient(135deg,#e3f2fd,#e0f7fa)', border: '1px solid #90caf9', fontSize: 12, fontWeight: 600, cursor: 'pointer', textAlign: 'left', minWidth: 120, transition: 'all 0.2s' }}
                                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                onMouseOut={e => e.currentTarget.style.transform = 'none'}>
                                                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{p.name}</div>
                                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.category}</div>
                                                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand)', marginTop: 2 }}>₹{p.price}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {searchResults.length === 0
                                ? <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: 20 }}>No products found.</p>
                                : <div className="product-grid">{searchResults.map(p => <ProductCard key={p.id} product={p} inCart={cartQty(p.name)} onAdd={() => doAddFromGrid(p)} onUpdateQty={doUpdateQty} />)}</div>
                            }
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className="section-title">
                        {CATEGORY_DATA[activeCategory]?.icon} {CATEGORY_DATA[activeCategory]?.label || activeCategory}
                        <span>{catalogue.length} products</span>
                    </div>

                    {catLoading ? (
                        <div className="product-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                                <div key={i} className="product-card">
                                    <div className="skeleton" style={{ height: 50, marginBottom: 6 }} />
                                    <div className="skeleton" style={{ height: 12, width: '80%', marginBottom: 4 }} />
                                    <div className="skeleton" style={{ height: 10, width: '50%', marginBottom: 8 }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div className="skeleton" style={{ height: 14, width: 36 }} />
                                        <div className="skeleton" style={{ height: 28, width: 28, borderRadius: 6 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="product-grid">
                            {catalogue.map(p => <ProductCard key={p.id} product={p} inCart={cartQty(p.name)} onAdd={() => doAddFromGrid(p)} onUpdateQty={doUpdateQty} />)}
                        </div>
                    )}
                </div>

                {/* ═══ CART SIDEBAR ═══ */}
                <div className={`cart-sidebar ${mobileCartOpen ? 'mobile-open' : ''}`}>
                    <div className="cart-panel">
                        <div className="cart-panel-header">
                            <h2>🛒 My Cart {totalItems > 0 && <span className="cart-count">{totalItems}</span>}</h2>
                            <button className="cart-mobile-close" onClick={() => setMobileCartOpen(false)}
                                style={{ marginLeft: 'auto', background: 'none', fontSize: 24, padding: 8, display: mobileCartOpen ? 'block' : 'none' }}>✕</button>
                        </div>
                        <div className="cart-panel-body">
                            {loading ? (
                                <div style={{ padding: 20 }}>{[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: 48, marginBottom: 8 }} />)}</div>
                            ) : items.length === 0 ? (
                                <div className="cart-empty">
                                    <p>🛒</p>
                                    <p>Your cart is empty</p>
                                    <p>Use voice or browse products</p>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item._id} className="cart-item">
                                        <button className={`cart-item-check ${item.purchased ? 'checked' : ''}`} onClick={() => doToggle(item._id, !item.purchased)}>
                                            {item.purchased && <span style={{ color: '#fff', fontSize: 10, fontWeight: 800 }}>✓</span>}
                                        </button>
                                        <div className="cart-item-info">
                                            <div className={`cart-item-name ${item.purchased ? 'purchased' : ''}`}>{item.name}</div>
                                            <div className="cart-item-meta">{item.quantity} {item.unit} · {item.category}</div>
                                        </div>
                                        <div className="qty-control" style={{ transform: 'scale(0.85)' }}>
                                            <button onClick={() => doUpdateQty(item._id, item.quantity - 1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => doUpdateQty(item._id, item.quantity + 1)}>+</button>
                                        </div>
                                        <span className="cart-item-price">₹{((item.price || 0) * item.quantity).toFixed(0)}</span>
                                        <button className="cart-item-delete" onClick={() => doDelete(item._id)}>🗑️</button>
                                    </div>
                                ))
                            )}
                        </div>
                        {items.length > 0 && (
                            <div className="cart-panel-footer">
                                <div className="cart-progress">
                                    <div className="cart-progress-bar" style={{ width: `${totalItems > 0 ? (purchased / totalItems) * 100 : 0}%` }} />
                                </div>
                                <div className="cart-progress-text">{purchased}/{totalItems} items checked</div>
                                {totalSavings > 0 && <div className="cart-savings">🎉 You save ₹{totalSavings.toFixed(0)}!</div>}
                                <div className="cart-total">
                                    <span className="cart-total-label">Estimated Total</span>
                                    <span className="cart-total-value">₹{totalPrice.toFixed(0)}</span>
                                </div>
                                <button className="cart-clear-btn" onClick={doClear}>🗑️ Clear entire list</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile bottom bar */}
            {totalItems > 0 && (
                <div className="cart-mobile-toggle" onClick={() => setMobileCartOpen(!mobileCartOpen)}>
                    <div className="cart-mobile-toggle-inner">
                        <span className="cart-mobile-items">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                        <span className="cart-mobile-total">₹{totalPrice.toFixed(0)} →</span>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══ PRODUCT CARD ═══ */
function ProductCard({ product, inCart, onAdd, onUpdateQty }) {
    const cat = CATEGORY_DATA[product.category] || { icon: '📦' };
    const discount = product.mrp && product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

    return (
        <div className="product-card fade-up">
            {discount > 0 && <span className="product-card-badge discount">{discount}% OFF</span>}

            <div className="product-card-image-container" style={{ width: '100%', height: 120, background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)', borderRadius: '12px 12px 0 0' }}>
                <div style={{ fontSize: '4rem' }}>{cat.icon}</div>
            </div>

            <div style={{ padding: 12 }}>
                <div className="product-card-name" style={{ marginBottom: 4 }}>{product.name}</div>
                <div className="product-card-unit" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{product.quantity} {product.unit} · {product.category}</div>

                <div className="product-card-footer" style={{ marginTop: 10 }}>
                    <div>
                        <span className="product-card-price">₹{product.price}</span>
                        {product.mrp > product.price && <span className="product-card-mrp">₹{product.mrp}</span>}
                    </div>
                    {inCart ? (
                        <div className="qty-control">
                            <button onClick={e => { e.stopPropagation(); onUpdateQty(inCart.id, inCart.qty - 1); }}>−</button>
                            <span>{inCart.qty}</span>
                            <button onClick={e => { e.stopPropagation(); onUpdateQty(inCart.id, inCart.qty + 1); }}>+</button>
                        </div>
                    ) : (
                        <button className="product-add-btn" onClick={onAdd}>+</button>
                    )}
                </div>
            </div>
        </div>
    );
}
