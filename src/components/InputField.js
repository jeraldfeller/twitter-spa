// src/components/InputField.js
import React from 'react';

const InputField = ({ username, setUsername, fetchTweets }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Enter Twitter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '10px', width: '250px' }}
      />
      <button onClick={fetchTweets} style={{ marginLeft: '10px', padding: '10px 20px' }}>
        Fetch Posts
      </button>
    </div>
  );
};

export default InputField;
