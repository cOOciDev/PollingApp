import React from 'react';

export default function PollResults({ polls }) {
  if (!polls || polls.length === 0) {
    return <p>No polls available</p>;
  }

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Poll Results</h3>
      {polls.map(poll => (
        <div key={poll.id} style={{ marginBottom: 20 }}>
          <h4>{poll.question}</h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {poll.options.map((opt, idx) => {
              const totalVotes = poll.options.reduce((acc, o) => acc + o.votes, 0);
              const percent = totalVotes ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0;
              return (
                <li key={idx}>
                  {opt.option}: {opt.votes} votes ({percent}%)
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
