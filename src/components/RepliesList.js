// src/components/RepliesList.js
import React from 'react';

const RepliesList = ({ replies }) => {
  return (
    <div>
      <h3>Replies</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {replies.map((reply) => (
          <li
            key={reply.id}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            {reply.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepliesList;
