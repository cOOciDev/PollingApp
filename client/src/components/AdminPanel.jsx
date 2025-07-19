import React, { useEffect, useState } from 'react';
import api from '../api';
import CreatePoll from './CreatePoll';

export default function AdminPanel({ groupName, polls, setPolls }) {
  const [error, setError] = useState('');

  // Load polls for group
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await api.get(`/admin/polls/${groupName}`, {
          headers: { 'x-admin-password': 'admin123' },
        });
        setPolls(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load polls');
      }
    };
    fetchPolls();
  }, [groupName, setPolls]);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Admin Panel for Group: {groupName}</h2>
      <CreatePoll groupName={groupName} setPolls={setPolls} />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Polls</h3>
      {polls.length === 0 && <p>No polls created yet.</p>}
      <ul>
        {polls.map((poll) => (
          <li key={poll.id}>
            <b>{poll.question}</b>
            <ul>
              {poll.options.map((opt, idx) => (
                <li key={idx}>
                  {opt.option} — {opt.votes} votes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
