export async function handler(event) {
    try {
      const { analysisType, company, domain, messages } = JSON.parse(event.body);
  
        // Construct messages array for the AI API
      const aiMessages = [
        {
           role: "system",
            content: `You are Kei, a cute and enthusiastic Arctic fox and LinkForge's AI assistant. Your role is to help professionals with:
              1. Company domain analysis
              2. Outreach strategy planning
              3. Tech stack predictions
              4. Sales research automation
              
              Guidelines:
              - Always respond as "Kei" using first-person pronouns (e.g., "I can help you with that!")
              - Maintain a professional yet friendly and approachable tone. Be a little cute and enthusiastic, like a curious and helpful Arctic fox!
              - Use bold (**) for section headers and key terms to make your responses clear.
              - Prioritize actionable insights over generic advice and always explain why, if possible.
              - Reference LinkForge capabilities when relevant to show how you can help.
              - Acknowledge security and scale considerations to be thorough.
              - Offer to expand on any points when appropriate or when it seems like it can help the user.
              - Answer any question as completely and helpfully as possible.
              - Do not output anything else than your answer (no greetings or anything)
              - If the question is not about company, tech stack, domain or outreach, answer as honestly as possible.
              - Remember the previous turns of this conversation.
            `
        },
      ];
  
      // Add conversation history to the messages array
      if (messages) {
        messages.forEach(msg => {
          aiMessages.push({ role: msg.type, content: msg.content });
        });
      }
  
      // Check if a specific analysis type is requested
      let userPrompt;
      if (analysisType) {
          userPrompt =  analysisType === 'domainValidation'
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
                4. Compliance needs (SOC2, GDPR, etc.)`;

            aiMessages.push({ role: 'user', content: userPrompt });
        }
      
      // Attempt DeepSeek API call first
      let deepseekResponse = null;
      try {
        deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
          },
          body: JSON.stringify({
             model: 'deepseek-chat',
            messages: aiMessages,
            temperature: 0.3,
            max_tokens: 500
          })
        });
  
        if (deepseekResponse.ok) {
            const deepseekData = await deepseekResponse.json();
              return {
                statusCode: 200,
                body: JSON.stringify({
                  content: deepseekData.choices[0]?.message?.content || "No response content found"
                })
              };
        } else {
          console.warn("DeepSeek API failed, attempting Gemini:", deepseekResponse.status);
        }
      } catch (deepseekError) {
        console.warn("Error during DeepSeek API call, attempting Gemini:", deepseekError);
      }
  
      // Gemini API call (if DeepSeek fails)
      try {
        const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': process.env.GEMINI_API_KEY
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
               text: aiMessages.map(m=> `${m.role}: ${m.content}`).join('\n')
               
                }]
            }]
          })
        });
  
        if (!geminiResponse.ok) {
          throw new Error(`Gemini API failed with status ${geminiResponse.status}`);
        }
  
        const geminiData = await geminiResponse.json();
          return {
            statusCode: 200,
            body: JSON.stringify({
              content: geminiData.candidates[0]?.content?.parts[0]?.text || "No response content found"
            })
          };
      } catch (geminiError) {
        console.error('Error during Gemini API call:', geminiError);
        return {
          statusCode: 500,
          body: JSON.stringify({
            error: 'Failed to process request from both APIs',
            details: geminiError.message
          })
        };
      }
  
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