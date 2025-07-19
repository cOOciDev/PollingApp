import React, { useState } from 'react';
import UserLogin from './components/UserLogin';
import JoinGroup from './components/JoinGroup';
import AdminPanel from './components/AdminPanel';
import PollVote from './components/PollVote';
import PollResults from './components/PollResults';

export default function App() {
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [polls, setPolls] = useState([]);
  const [currentPoll, setCurrentPoll] = useState(null);

  if (!username) {
    return <UserLogin setUsername={setUsername} setIsAdmin={setIsAdmin} />;
  }

  if (!groupName) {
    return <JoinGroup setGroupName={setGroupName} username={username} />;
  }

  if (isAdmin) {
    return (
      <AdminPanel
        groupName={groupName}
        polls={polls}
        setPolls={setPolls}
      />
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>Group: {groupName}</h2>
      <PollVote
        groupName={groupName}
        polls={polls}
        setPolls={setPolls}
        currentPoll={currentPoll}
        setCurrentPoll={setCurrentPoll}
        username={username}
      />
      <PollResults polls={polls} />
    </div>
  );
}
