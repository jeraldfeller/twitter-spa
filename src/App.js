import React, { useState, useEffect } from 'react';
import InputField from './components/InputField';
import TweetList from './components/TweetList';
import RepliesList from './components/RepliesList';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [tweets, setTweets] = useState([]);
  const [replies, setReplies] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication state
  const [password, setPassword] = useState(''); // Tracks the entered password
  const appPassword = process.env.REACT_APP_APP_PASSWORD; // The password from .env

  const SESSION_EXPIRY_MINUTES = 30; // Session expiry time in minutes

  // Function to check if the session is still valid
  const checkSessionValidity = () => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData) {
      const { timestamp } = authData;
      const now = new Date().getTime();
      const sessionExpiry = SESSION_EXPIRY_MINUTES * 60 * 1000; // Convert minutes to milliseconds

      if (now - timestamp < sessionExpiry) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authData'); // Remove expired session
      }
    }
  };

  // Function to handle login
  const handleLogin = () => {
    if (password === appPassword) {
      const timestamp = new Date().getTime();
      const authData = { timestamp }; // Save the timestamp in localStorage
      localStorage.setItem('authData', JSON.stringify(authData));
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('authData');
    setIsAuthenticated(false);
  };

  // Check session validity on initial render
  useEffect(() => {
    checkSessionValidity();
  }, []);

  const fetchTweets = async () => {
    try {
      const response = await axios.get(
        `https://api.twitter.com/2/tweets?username=${username}`, // Replace with the actual API endpoint
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`,
          },
        }
      );
      setTweets(response.data.data);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const fetchReplies = async (tweetId) => {
    try {
      const response = await axios.get(
        `https://api.twitter.com/2/tweets/${tweetId}/replies`, // Replace with the actual API endpoint
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`,
          },
        }
      );
      setReplies(response.data.data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  if (!isAuthenticated) {
    // Render a password-protected login screen
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Twitter App Authentication</h1>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', width: '250px', marginBottom: '10px' }}
        />
        <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
          Login
        </button>
      </div>
    );
  }

  // Render the main app if authenticated
  return (
    <div style={{ padding: '20px' }}>
      <h1>Twitter Posts and Replies</h1>
      <button onClick={handleLogout} style={{ float: 'right', padding: '10px 20px', marginBottom: '10px' }}>
        Logout
      </button>
      <InputField username={username} setUsername={setUsername} fetchTweets={fetchTweets} />
      <TweetList tweets={tweets} fetchReplies={fetchReplies} />
      {replies.length > 0 && <RepliesList replies={replies} />}
    </div>
  );
};

export default App;
