'use client';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`fixed bottom-6 right-6 p-3.5 rounded-full shadow-2xl transition-all duration-300 z-50 backdrop-blur-md border ${isDark
                    ? 'bg-slate-800/90 text-amber-400 border-slate-600 hover:bg-slate-700 hover:scale-110 hover:shadow-amber-900/20'
                    : 'bg-white/90 text-indigo-950 border-indigo-100 hover:bg-indigo-50 hover:scale-110 hover:shadow-indigo-200/50'
                }`}
            aria-label="Toggle Dark Mode"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {isDark ? (
                // Sun Icon for Dark Mode (indicating switch to Light)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                // Moon Icon for Light Mode (indicating switch to Dark)
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
            )}
        </button>
    );
}
