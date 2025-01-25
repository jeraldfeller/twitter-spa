const axios = require('axios');

export default async function handler(req, res) {
  const { endpoint, username, tweetId } = req.query; // Extract query parameters

  // Build the URL based on the endpoint and parameters
  const url =
    endpoint === 'tweets'
      ? `https://api.twitter.com/2/tweets?username=${username}`
      : `https://api.twitter.com/2/tweets/${tweetId}/replies`;

  try {
    // Make the API request to Twitter
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`, // Use the Bearer Token from environment variables
      },
    });

    // Send the data back to the client
    res.status(200).json(response.data);
  } catch (error) {
    // Handle errors and send error responses
    res.status(error.response?.status || 500).json({
      error: error.message || 'An error occurred',
    });
  }
}
