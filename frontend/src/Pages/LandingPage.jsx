import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI, register as registerAPI } from '../services/authService';

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                // Login
                const response = await loginAPI({
                    email: formData.email,
                    username: formData.email, // Allow either
                    password: formData.password
                });
                localStorage.setItem('token', response.data.accessToken);
                navigate('/home');
            } else {
                // Sign up
                const response = await registerAPI({
                    fullName: formData.fullName,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                });
                localStorage.setItem('token', response.data.accessToken);
                navigate('/home');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setFormData({
            fullName: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    return (
        <div className="min-h-screen bg-black flex relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-pulse delay-500" />
                <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            {/* Left side - Branding */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative z-10 p-12">
                <div className="max-w-lg space-y-8">
                    {/* Logo */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <span className="text-white text-2xl font-black">V</span>
                            </div>
                            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Vaani
                            </h1>
                        </div>
                        <p className="text-gray-400 text-xl leading-relaxed">
                            Your voice matters. Share your thoughts, connect with the world.
                        </p>
                    </div>

                    {/* Feature highlights */}
                    <div className="space-y-5">
                        {[
                            { icon: '🌐', title: 'Connect Globally', desc: 'Reach people across the world' },
                            { icon: '📸', title: 'Share Stories', desc: '24-hour stories with your followers' },
                            { icon: '💬', title: 'Real-time Chat', desc: 'Instant messaging with friends' },
                            { icon: '🔒', title: 'Secure & Private', desc: 'Your data stays yours' },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default group"
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                                <div>
                                    <h3 className="text-white font-semibold">{feature.title}</h3>
                                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side - Auth Form */}
            <div className="flex-1 flex items-center justify-center relative z-10 p-6 sm:p-12">
                <div className="w-full max-w-md">
                    {/* Mobile logo */}
                    <div className="lg:hidden text-center mb-10">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <span className="text-white text-xl font-black">V</span>
                            </div>
                            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Vaani
                            </h1>
                        </div>
                        <p className="text-gray-500">Your voice matters</p>
                    </div>

                    {/* Auth Card */}
                    <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800/80 p-8 shadow-2xl shadow-black/50">
                        {/* Toggle tabs */}
                        <div className="flex mb-8 bg-gray-800/50 rounded-2xl p-1.5">
                            <button
                                onClick={() => { if (!isLogin) toggleMode(); }}
                                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${isLogin
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'text-gray-400 hover:text-gray-300'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { if (isLogin) toggleMode(); }}
                                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${!isLogin
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'text-gray-400 hover:text-gray-300'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {isLogin ? 'Welcome back' : 'Create account'}
                            </h2>
                            <p className="text-gray-500 mt-1 text-sm">
                                {isLogin
                                    ? 'Sign in to continue to Vaani'
                                    : 'Join Vaani and start sharing your voice'}
                            </p>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            required
                                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Choose a username"
                                            required
                                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                                    {isLogin ? 'Email or Username' : 'Email'}
                                </label>
                                <input
                                    type={isLogin ? 'text' : 'email'}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={isLogin ? 'Enter email or username' : 'Enter your email'}
                                    required
                                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300"
                                />
                            </div>

                            {!isLogin && (
                                <div>
                                    <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        required
                                        className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
                                    />
                                </div>
                            )}

                            {isLogin && (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${isLogin
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/25 hover:shadow-blue-500/40'
                                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-500/25 hover:shadow-purple-500/40'
                                    } ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        {isLogin ? 'Signing in...' : 'Creating account...'}
                                    </span>
                                ) : (
                                    isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-800" />
                            <span className="text-gray-600 text-xs uppercase tracking-wider">or continue with</span>
                            <div className="flex-1 h-px bg-gray-800" />
                        </div>

                        {/* Social login buttons */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: '🔵', label: 'Google' },
                                { icon: '⚫', label: 'GitHub' },
                                { icon: '🟣', label: 'Discord' },
                            ].map((social, i) => (
                                <button
                                    key={i}
                                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:bg-gray-700/50 hover:text-white hover:border-gray-600 transition-all duration-300"
                                >
                                    <span className="text-sm">{social.icon}</span>
                                    <span className="text-xs font-medium hidden sm:inline">{social.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <p className="text-center text-gray-600 text-xs mt-6">
                            {isLogin ? "Don't have an account? " : 'Already have an account? '}
                            <button
                                onClick={toggleMode}
                                className={`font-semibold transition-colors ${isLogin ? 'text-blue-400 hover:text-blue-300' : 'text-purple-400 hover:text-purple-300'
                                    }`}
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>

                    {/* Terms */}
                    <p className="text-center text-gray-700 text-xs mt-4 px-4">
                        By continuing, you agree to Vaani's{' '}
                        <span className="text-gray-500 hover:text-gray-400 cursor-pointer">Terms of Service</span>
                        {' '}and{' '}
                        <span className="text-gray-500 hover:text-gray-400 cursor-pointer">Privacy Policy</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
