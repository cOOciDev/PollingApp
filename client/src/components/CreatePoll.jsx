import React, { useState } from 'react';
import api from '../api';

export default function CreatePoll({ groupName, setPolls }) {
  const [question, setQuestion] = useState('');
  const [optionInputs, setOptionInputs] = useState(['', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateOption = (index, value) => {
    const newOptions = [...optionInputs];
    newOptions[index] = value;
    setOptionInputs(newOptions);
  };

  const addOption = () => {
    setOptionInputs([...optionInputs, '']);
  };

  const removeOption = (index) => {
    if (optionInputs.length <= 2) return; // Minimum 2 options
    setOptionInputs(optionInputs.filter((_, i) => i !== index));
  };

  const submitPoll = async () => {
    setError('');
    if (!question.trim()) {
      setError('Question is required');
      return;
    }
    if (optionInputs.some(opt => !opt.trim())) {
      setError('All options must be filled');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/admin/polls', {
        groupName,
        question: question.trim(),
        options: optionInputs.map(o => o.trim()),
      }, {
        headers: { 'x-admin-password': 'admin123' },
      });

      setPolls(prev => [...prev, res.data]);
      setQuestion('');
      setOptionInputs(['', '']);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create poll');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Create New Poll</h3>
      <input
        type="text"
        placeholder="Poll question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        style={{ width: '100%', marginBottom: 8, padding: 6 }}
      />
      <div>
        {optionInputs.map((opt, idx) => (
          <div key={idx} style={{ display: 'flex', marginBottom: 6 }}>
            <input
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={e => updateOption(idx, e.target.value)}
              style={{ flex: 1, padding: 6 }}
            />
            {optionInputs.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(idx)}
                style={{ marginLeft: 4 }}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
      <button onClick={addOption} type="button" style={{ marginBottom: 10 }}>
        + Add Option
      </button>
      <br />
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button onClick={submitPoll} disabled={loading}>
        {loading ? 'Creating...' : 'Create Poll'}
      </button>
    </div>
  );
}
