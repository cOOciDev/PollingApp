import React, { useState } from 'react';
import api from '../api';

export default function JoinGroup({ setGroupName, username }) {
  const [groupInput, setGroupInput] = useState('');
  const [error, setError] = useState('');

  const joinGroup = async () => {
    if (!groupInput.trim()) {
      setError('Please enter a group name');
      return;
    }

    try {
      // Try joining group via server (creates group if admin later)
      await api.post('/poll/join', {
        groupName: groupInput.trim(),
        username,
      });
      setGroupName(groupInput.trim());
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join group');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Join a Poll Group</h2>
      <input
        type="text"
        placeholder="Group name"
        value={groupInput}
        onChange={e => setGroupInput(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 12 }}
      />
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <button onClick={joinGroup} style={{ padding: '10px 15px' }}>
        Join Group
      </button>
    </div>
  );
}
