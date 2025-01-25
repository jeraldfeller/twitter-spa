// src/components/TweetList.js
import React from 'react';

const TweetList = ({ tweets, fetchReplies }) => {
  return (
    <div>
      <h3>Posts</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tweets.map((tweet) => (
          <li
            key={tweet.id}
            onClick={() => fetchReplies(tweet.id)}
            style={{
              border: '1px solid #ddd',
              padding: '10px',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
          >
            {tweet.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetList;
