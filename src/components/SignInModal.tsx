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
    <div className="fixed inset-0 bg-secondary bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-gray-900 font-bold text-xl">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* User Type Tabs */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setUserType('users')}
              className={`flex-1 py-3 px-4 rounded-md transition-all font-medium flex items-center justify-center gap-2 ${
                userType === 'users'
                  ? 'bg-secondary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
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
                  ? 'bg-secondary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-200'
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
              <label className="block mb-2 text-gray-900 font-medium">
                <User className="inline-block w-4 h-4 mr-1" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2 text-gray-900 font-medium">
              <Mail className="inline-block w-4 h-4 mr-1" />
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              placeholder="john@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-900 font-medium">
              <Lock className="inline-block w-4 h-4 mr-1" />
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium shadow-lg"
          >
            {isSignUp ? `Create ${userType === 'users' ? 'User' : 'Renter'} Account` : 'Sign In'}
          </button>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-secondary hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}