import { useState, useEffect } from 'react';

export default function LoginPage({ onLogin }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('demo@voicecart.com');
    const [password, setPassword] = useState('123456');
    const [error, setError] = useState('');

    // Auto-seed demo user for convenience
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('vc_users') || '[]');
        if (!users.find(u => u.email === 'demo@voicecart.com')) {
            users.push({ name: 'Demo User', email: 'demo@voicecart.com', password: '123456' });
            localStorage.setItem('vc_users', JSON.stringify(users));
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (!email || !password) return setError('Please fill all fields');
        if (isSignUp && !name) return setError('Name is required');
        if (password.length < 4) return setError('Password must be at least 4 characters');
        // simple local auth — stores user in localStorage
        if (isSignUp) {
            const existing = JSON.parse(localStorage.getItem('vc_users') || '[]');
            if (existing.find(u => u.email === email)) return setError('Email already registered');
            existing.push({ name, email, password });
            localStorage.setItem('vc_users', JSON.stringify(existing));
        } else {
            const users = JSON.parse(localStorage.getItem('vc_users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) return setError('Invalid email or password');
            name || setName(user.name);
        }
        const userName = isSignUp ? name : (JSON.parse(localStorage.getItem('vc_users') || '[]').find(u => u.email === email)?.name || 'User');
        localStorage.setItem('vc_current_user', JSON.stringify({ name: userName, email }));
        onLogin({ name: userName, email });
    }

    return (
        <div className="login-page">
            {/* decorative blobs */}
            <div className="login-blob login-blob-1" />
            <div className="login-blob login-blob-2" />
            <div className="login-blob login-blob-3" />

            <div className="login-container">
                <div className="login-left">
                    <div className="login-brand">
                        <span className="login-brand-icon">🛒</span>
                        <h1>VoiceCart</h1>
                    </div>
                    <p className="login-tagline">Your AI-Powered<br />Grocery Assistant</p>
                    <div className="login-features">
                        <div className="login-catchy-container" style={{ textAlign: 'left', marginTop: '10px' }}>
                            <p style={{
                                fontSize: '24px',
                                fontWeight: '700',
                                color: 'white',
                                marginBottom: '12px',
                                lineHeight: '1.3',
                                fontFamily: "'Poppins', sans-serif"
                            }}>
                                Just Say It. <br />We Cart It. 🛒
                            </p>
                            <p style={{
                                fontSize: '15px',
                                color: 'rgba(255, 255, 255, 0.85)',
                                lineHeight: '1.6',
                                maxWidth: '380px'
                            }}>
                                Forget the typing. Just say "Add 3 dozen eggs", and watch your cart fill up instantly.
                                The fastest way to shop for Indian groceries.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-form-wrapper">
                        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                        <p className="login-subtitle">{isSignUp ? 'Start your smart shopping journey' : 'Sign in to continue shopping'}</p>

                        {error && <div className="login-error">⚠️ {error}</div>}

                        <form onSubmit={handleSubmit}>
                            {isSignUp && (
                                <div className="login-field">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="Rahul Sharma" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                            )}
                            <div className="login-field">
                                <label>Email Address</label>
                                <input type="email" placeholder="rahul@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="login-field">
                                <label>Password</label>
                                <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="login-submit-btn">
                                {isSignUp ? '🚀 Create Account' : '🛒 Sign In'}
                            </button>
                        </form>

                        <p className="login-switch">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }}>
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
