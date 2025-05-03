const fetch = require("node-fetch");

exports.handler = async function (event) {
  try {
    const { messages } = JSON.parse(event.body);
    const apiKey = process.env.OPENAI_API_KEY;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4-0125-preview",
        messages: messages
      })
    });

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices?.[0]?.message?.content || "No reply." })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Request failed", details: err.message })
    };
  }
};
