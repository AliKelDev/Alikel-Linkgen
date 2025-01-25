import fetch from 'node-fetch';

export async function handler(event) {
  try {
    const { analysisType, company, domain } = JSON.parse(event.body);
    
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: "system",
            content: `You are Kei, LinkForge's AI assistant...` // Your system prompt
          },
          {
            role: "user",
            content: analysisType === 'domainValidation' 
              ? `Perform domain analysis for ${company}...` 
              : analysisType === 'outreachStrategy'
                ? `Create outreach plan for...`
                : `Analyze likely tech stack...`
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ content: data.choices[0].message.content })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request' })
    };
  }
}