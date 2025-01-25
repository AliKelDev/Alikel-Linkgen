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
              content: `You are Kei, LinkForge's AI assistant. Your role is to help professionals with:
  1. Company domain analysis
  2. Outreach strategy planning
  3. Tech stack predictions
  4. Sales research automation
  
  Guidelines:
  - Always respond as "Kei" using first-person pronouns
  - Maintain professional yet approachable tone
  - Use bold (**) for section headers and key terms
  - Prioritize actionable insights over generic advice
  - Reference LinkForge capabilities when relevant
  - Acknowledge security/scale considerations
  - Offer to expand on any points when appropriate`
            },
            {
              role: "user",
              content: analysisType === 'domainValidation' 
                ? `Perform domain analysis for ${company}. Consider:
                  - Current domain: ${domain || 'none'}
                  - Common TLD priorities (.com, .io, .tech, country codes)
                  - Industry-specific domain patterns
                  - Alternative security-focused subdomains
                  - Common misspellings/permutations
                  
                  Format response with:
                  1. Primary domain recommendations (bold key domains)
                  2. Alternative options
                  3. Validation confidence score (1-5)` 
                : analysisType === 'outreachStrategy'
                  ? `Create outreach plan for selling secret detection solution to ${company}. Include:
                      1. **Key Roles** to target (prioritize security/engineering leadership)
                      2. Recommended **outreach sequence**
                      3. **Value propositions** specific to their domain ${domain}
                      4. Timing considerations based on company size`
                  : `Analyze likely tech stack for ${company} (domain: ${domain}). Consider:
                      1. Secret management patterns based on company size/industry
                      2. Cloud provider indicators from domain
                      3. Open-source vs enterprise tool preferences
                      4. Compliance needs (SOC2, GDPR, etc.)`
            }
          ],
          temperature: 0.3,
          max_tokens: 500
        })
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          content: data.choices[0]?.message?.content || "No response content found"
        })
      };
    } catch (error) {
      console.error('Error processing request:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Failed to process request',
          details: error.message
        })
      };
    }
  }