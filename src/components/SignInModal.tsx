import { useState } from 'react';
import { X, Mail, Lock, User, Car, Users } from 'lucide-react';

interface SignInModalProps {
  onClose: () => void;
  onSignIn: (email: string) => void;
}

export function SignInModal({ onClose, onSignIn }: SignInModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState<'users' | 'renters'>('users');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(formData.email);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-secondary rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <h2 className="text-white">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* User Type Tabs */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex gap-2 bg-white/10 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setUserType('users')}
              className={`flex-1 py-3 px-4 rounded-md transition-all font-medium flex items-center justify-center gap-2 ${
                userType === 'users'
                  ? 'bg-white text-secondary shadow-md'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" />
              Users
            </button>
            <button
              type="button"
              onClick={() => setUserType('renters')}
              className={`flex-1 py-3 px-4 rounded-md transition-all font-medium flex items-center justify-center gap-2 ${
                userType === 'renters'
                  ? 'bg-white text-secondary shadow-md'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              <Car className="w-4 h-4" />
              Renters
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6">
          {isSignUp && (
            <div className="mb-4">
              <label className="block mb-2 text-white font-medium">
                <User className="inline-block w-4 h-4 mr-1" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-white font-medium">
              <Mail className="inline-block w-4 h-4 mr-1" />
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none"
              placeholder="john@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-white font-medium">
              <Lock className="inline-block w-4 h-4 mr-1" />
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white placeholder-white/60 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-white text-secondary rounded-lg hover:bg-gray-100 transition-colors font-medium shadow-lg"
          >
            {isSignUp ? `Create ${userType === 'users' ? 'User' : 'Renter'} Account` : 'Sign In'}
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}