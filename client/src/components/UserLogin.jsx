import React, { useState } from 'react';

export default function UserLogin({ setUsername, setIsAdmin }) {
  const [nameInput, setNameInput] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setError('Please enter a username');
      return;
    }
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setUsername(nameInput.trim());
    } else if (adminPassword.length > 0) {
      setError('Invalid admin password');
    } else {
      setIsAdmin(false);
      setUsername(nameInput.trim());
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Enter your username</h2>
      <input
        type="text"
        placeholder="Username"
        value={nameInput}
        onChange={e => setNameInput(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />
      <input
        type="password"
        placeholder="Admin password (optional)"
        value={adminPassword}
        onChange={e => setAdminPassword(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <button type="submit" style={{ padding: '10px 15px' }}>Enter</button>
    </form>
  );
}
