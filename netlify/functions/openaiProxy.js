// netlify/functions/openaiProxy.js
const axios = require('axios');

exports.handler = async function(event) {
  const requestBody = JSON.parse(event.body);
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Set this in your Netlify Environment Variables

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: requestBody,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status || 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
