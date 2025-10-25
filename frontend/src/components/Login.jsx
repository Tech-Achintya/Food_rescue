import { useState } from 'react';
import { post } from '../api';

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login'); // "login" or "register"
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('MESS');

  const submit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!contact.trim() || !role) {
      alert('Please enter contact and role');
      return;
    }
    // If registering, ensure name provided
    if (mode === 'register' && !name.trim()) {
      alert('Please enter name to register');
      return;
    }

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      // Always include name (keeps compatibility if backend expects it)
      const payload =
        mode === 'login'
          ? { name: name.trim(), contact: contact.trim(), role }
          : { name: name.trim(), contact: contact.trim(), role };

      const res = await post(endpoint, payload);
      console.log(`${mode} response:`, res);

      if (res.error) {
        alert(res.error);
        return;
      }

      if (mode === 'register') {
        alert('Registration successful — you can now log in.');
        setMode('login');
        // keep contact so user can quickly login, clear name if you want:
        // setName('');
      } else {
        // Login success: pass user object to parent
        onLogin(res);
      }
    } catch (err) {
      console.error(`${mode} failed:`, err);
      alert('Something went wrong. Check console.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4 text-center font-semibold">
        {mode === 'login' ? 'Login' : 'Register'} ({role})
      </h2>

      <form onSubmit={submit} className="space-y-3">
        {/* Name is shown always to avoid mismatch */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />

        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Number"
          className="w-full p-2 border rounded"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="MESS">Mess Head</option>
          <option value="NGO">NGO User</option>
        </select>

        <button
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          type="submit"
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      <p className="text-center mt-3 text-sm">
        {mode === 'login' ? (
          <>
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('register')}
              className="text-blue-600 underline"
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already registered?{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-blue-600 underline"
            >
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}
