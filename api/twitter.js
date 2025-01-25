const axios = require('axios');

export default async function handler(req, res) {
  const { endpoint, username, tweetId } = req.query;

  // Build the URL for the Twitter API
  const url =
    endpoint === 'tweets'
      ? `https://api.twitter.com/2/tweets?username=${username}`
      : `https://api.twitter.com/2/tweets/${tweetId}/replies`;

  try {
    // Make the API request to Twitter
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`,
      },
    });

    // Send the successful response back to the client
    res.status(200).json(response.data);
  } catch (error) {
    // Log the error for debugging
    console.error('Twitter API error:', error.response?.data || error.message);

    // Send a detailed error response
    res.status(error.response?.status || 500).json({
      code: error.response?.status || 500,
      message: error.response?.data || error.message,
    });
  }
}
