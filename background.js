// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "FETCH_AI_COMPLETION") {
//     fetch("https://api.groq.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer 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`,
//       },
//       body: JSON.stringify({
//         model: "llama3-8b", // Or any model available in Groq
//         messages: [
//           { role: "system", content: "You are a helpful AI assistant." },
//           { role: "user", content: message.text },
//         ],
//         max_tokens: 50,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) =>
//         sendResponse({ completion: data.choices[0].message.content })
//       )
//       .catch((error) => console.error("Groq API Request Failed:", error));

//     return true; // Keep async response open
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "FETCH_AI_COMPLETION") {
//     fetch("https://api.groq.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer YOUR_GROQ_API_KEY`,
//       },
//       body: JSON.stringify({
//         model: "mixtral", // Switch to Mixtral for better accuracy
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are an AI writing assistant that provides autocomplete suggestions. Keep responses concise and natural.",
//           },
//           {
//             role: "user",
//             content: `Complete the following sentence in a natural way: "${message.text}"`,
//           },
//         ],
//         max_tokens: 50,
//         temperature: 0.7, // Lower = more predictable completions
//         top_p: 0.9, // Ensures diverse yet relevant suggestions
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) =>
//         sendResponse({ completion: data.choices[0].message.content })
//       )
//       .catch((error) => console.error("Groq API Request Failed:", error));

//     return true; // Keep async response open
//   }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "FETCH_AI_COMPLETION") {
//     const { url, title, userInput } = message.context;

//     fetch("https://api.groq.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer YOUR_GROQ_API_KEY`,
//       },
//       body: JSON.stringify({
//         model: "mixtral", // Test mixtral first, then try llama3-8b
//         messages: [
//           {
//             role: "system",
//             content: `You are an AI autocomplete assistant helping users write complete thoughts.
//                         The user is on a website titled "${title}" (${url}).
//                         Your goal is to generate **long, context-aware, natural continuations** of their sentences.
//                         Provide **at least two full sentences** that make sense with what they are typing.`,
//           },
//           {
//             role: "user",
//             content: `The user is typing: "${userInput}".
//                         Continue their thought in a way that is natural and detailed.
//                         Always **output at least 25-50 words** unless the text is a short question.`,
//           },
//         ],
//         max_tokens: 150, // ⬆️ Increased to allow longer completions
//         temperature: 0.65, // ⬆️ Slightly increased to encourage creativity
//         top_p: 1.0, // ⬆️ Ensures diverse but logical suggestions
//         frequency_penalty: 0.3, // ⬆️ Reduces repetitive completions
//         presence_penalty: 0.4, // ⬆️ Encourages introducing new ideas
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.choices && data.choices.length > 0) {
//           sendResponse({ completion: data.choices[0].message.content });
//         } else {
//           sendResponse({ completion: "" }); // Avoid undefined errors
//         }
//       })
//       .catch((error) => {
//         console.error("Groq API Request Failed:", error);
//         sendResponse({ completion: "" });
//       });

//     return true; // Keep async response open
//   }
// });

// deepseek
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "FETCH_AI_COMPLETION") {
//     const { url, title, userInput } = message.context;

//     fetch("https://api.deepseek.com/v1/chat/completions", {
//       // ⬅️ DeepSeek API endpoint
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer sk-d48d89830e6041a19fac341bc94b2384`,
//       },
//       body: JSON.stringify({
//         model: "deepseek-chat-7b", // ⬅️ Try "deepseek-coder-33b" for more complex writing
//         messages: [
//           {
//             role: "system",
//             content: `You are an AI autocomplete assistant helping users write detailed, multi-sentence responses.
//                         The user is on a website titled "${title}" (${url}).
//                         Your goal is to generate **long, highly detailed completions** with at least two full sentences.`,
//           },
//           {
//             role: "user",
//             content: `The user is typing: "${userInput}".
//                         Complete this text naturally with at least 40-60 words. Provide meaningful, well-structured continuations.`,
//           },
//         ],
//         max_tokens: 250, // ⬆️ Increased token limit for long responses
//         temperature: 0.7, // ⬆️ Slightly higher for diverse ideas
//         top_p: 0.95, // ⬆️ Allows variety while keeping logical structure
//         frequency_penalty: 0.2, // ⬇️ Avoids repetitive phrases
//         presence_penalty: 0.3, // ⬆️ Encourages adding new relevant details
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.choices && data.choices.length > 0) {
//           sendResponse({ completion: data.choices[0].message.content });
//         } else {
//           sendResponse({ completion: "" });
//         }
//       })
//       .catch((error) => {
//         console.error("DeepSeek API Request Failed:", error);
//         sendResponse({ completion: "" });
//       });

//     return true; // Keep async response open
//   }
// });

// // deepseek
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "FETCH_AI_COMPLETION") {
//     chrome.storage.local.get(
//       ["writingStyle", "maxTokens", "aiModel"],
//       (settings) => {
//         const { url, title, userInput } = message.context;

//         let toneInstruction = "";
//         if (settings.writingStyle === "concise")
//           toneInstruction = "Keep responses short and to the point.";
//         if (settings.writingStyle === "detailed")
//           toneInstruction = "Provide an in-depth, well-developed continuation.";
//         if (settings.writingStyle === "formal")
//           toneInstruction = "Use professional and formal language.";
//         if (settings.writingStyle === "casual")
//           toneInstruction = "Use relaxed, conversational wording.";

//         fetch("https://api.deepseek.com/v1/chat/completions", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer sk-f5c6d2d998624435a09aef3b2eb31b71`,
//           },
//           body: JSON.stringify({
//             model: settings.aiModel || "deepseek-chat-7b", // Default to DeepSeek Chat
//             messages: [
//               {
//                 role: "system",
//                 content: `You are an AI writing assistant. The user is on "${title}" (${url}).
//                           ${toneInstruction}
//                           Generate text that flows naturally with what the user is writing.`,
//               },
//               {
//                 role: "user",
//                 content: `User is typing: "${userInput}".
//                           Provide a logical and well-structured continuation, aiming for at least 100 words if possible.`,
//               },
//             ],
//             max_tokens: settings.maxTokens || 150, // Default to 150 if not set
//             temperature: 0.7,
//             top_p: 0.95,
//             frequency_penalty: 0.2,
//             presence_penalty: 0.3,
//           }),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.choices && data.choices.length > 0) {
//               sendResponse({ completion: data.choices[0].message.content });
//             } else {
//               sendResponse({ completion: "" });
//             }
//           })
//           .catch((error) => {
//             console.error("DeepSeek API Request Failed:", error);
//             sendResponse({ completion: "" });
//           });

//         return true; // Keep async response open
//       }
//     );
//   }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "FETCH_AI_COMPLETION") {
    chrome.storage.local.get(
      ["writingStyle", "maxTokens", "aiModel"],
      (settings) => {
        const { url, title, conversationHistory } = message.context;

        let toneInstruction = "";
        if (settings.writingStyle === "concise")
          toneInstruction = "Keep responses short and to the point.";
        if (settings.writingStyle === "detailed")
          toneInstruction = "Provide an in-depth, well-developed continuation.";
        if (settings.writingStyle === "formal")
          toneInstruction = "Use professional and formal language.";
        if (settings.writingStyle === "casual")
          toneInstruction = "Use relaxed, conversational wording.";

        fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_DEEPSEEK_API_KEY`,
          },
          body: JSON.stringify({
            model: settings.aiModel || "deepseek-chat-7b",
            messages: [
              {
                role: "system",
                content: `You are an AI autocomplete assistant.
                        The user is typing on a website titled "${title}" (${url}).
                        Your goal is to generate **highly predictive, logical completions** based on the ongoing conversation.
                        Use the conversation history to understand the topic and suggest meaningful continuations.
                        ${toneInstruction}`,
              },
              {
                role: "user",
                content: `Here is the conversation so far:
                        "${conversationHistory}"

                        Predict what the user is likely to type next.
                        Ensure the response is **detailed, natural, and at least 60-100 words long**.`,
              },
            ],
            max_tokens: settings.maxTokens || 250, // ⬆️ Increased length
            temperature: 0.8, // ⬆️ More creativity
            top_p: 0.9, // ⬆️ Keep it diverse but logical
            frequency_penalty: 0.2,
            presence_penalty: 0.5, // ⬆️ Encourage new ideas
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.choices && data.choices.length > 0) {
              sendResponse({ completion: data.choices[0].message.content });
            } else {
              sendResponse({ completion: "" });
            }
          })
          .catch((error) => {
            console.error("DeepSeek API Request Failed:", error);
            sendResponse({ completion: "" });
          });

        return true; // Keep async response open
      }
    );
  }
});
