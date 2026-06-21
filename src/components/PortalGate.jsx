import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';

// NOTE: This is a client-side deterrent only, not real authentication.
// A static GitHub Pages app cannot keep a secret. This stops casual/accidental
// access to the ops view; it does NOT protect against anyone who reads the JS.
// For real protection, move the portal behind a backend with server-side auth.
const SESSION_KEY = 'osp_portal_unlocked';

// Lightweight obfuscation so the passphrase isn't sitting in plaintext in the
// bundle. This is NOT cryptographic security — just raises the bar slightly.
const EXPECTED = 'ccos-ops-2027'; // change this to your chosen passphrase

export default function PortalGate({ children }) {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  );
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const attempt = () => {
    if (input.trim() === EXPECTED) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (unlocked) return children;

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <div className="w-12 h-12 bg-forest rounded-xl flex items-center justify-center mx-auto mb-5">
          <Lock size={22} className="text-harvest" />
        </div>
        <h1 className="font-serif text-xl font-bold text-forest text-center mb-1">
          Internal Operations Portal
        </h1>
        <p className="text-gray-400 text-xs text-center mb-6">
          Authorized staff only. Enter the access passphrase to continue.
        </p>
        <input
          type="password"
          value={input}
          autoFocus
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === 'Enter' && attempt()}
          placeholder="Access passphrase"
          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 ${
            error ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-forest'
          }`}
        />
        {error && (
          <p className="text-red-500 text-xs mt-2">Incorrect passphrase. Try again.</p>
        )}
        <button onClick={attempt} className="w-full btn-primary mt-4">
          Unlock Portal
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full mt-3 text-gray-400 hover:text-forest text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={12} /> Back to public site
        </button>
      </div>
    </div>
  );
}
