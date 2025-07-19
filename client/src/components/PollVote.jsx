import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../api';

const socket = io('http://localhost:4000');

export default function PollVote({ groupName, polls, setPolls, currentPoll, setCurrentPoll, username }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    socket.emit('subscribe', groupName);

    socket.on('polls', (pollsData) => {
      setPolls(pollsData);
      // Select first active poll if none selected
      if (!currentPoll) {
        const activePoll = pollsData.find(p => p.active);
        setCurrentPoll(activePoll || null);
      }
    });

    return () => {
      socket.off('polls');
    };
  }, [groupName, setPolls, currentPoll, setCurrentPoll]);

  if (!currentPoll) {
    return <p>No active polls right now.</p>;
  }

  const submitVote = async () => {
    if (selectedOption === null) {
      setError('Please select an option');
      return;
    }
    setError('');

    try {
      await api.post('/poll/vote', {
        groupName,
        pollId: currentPoll.id,
        optionIndex: selectedOption,
      });
      setSelectedOption(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Vote failed');
    }
  };

  return (
    <div>
      <h3>{currentPoll.question}</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {currentPoll.options.map((opt, idx) => (
          <li key={idx} style={{ marginBottom: 8 }}>
            <label>
              <input
                type="radio"
                name="pollOption"
                value={idx}
                checked={selectedOption === idx}
                onChange={() => setSelectedOption(idx)}
              />
              {' '}
              {opt.option}
            </label>
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={submitVote}>Submit Vote</button>
    </div>
  );
}
