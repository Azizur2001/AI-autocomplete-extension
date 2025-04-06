// let conversationHistory = [];

// function attachAIHandler(textarea) {
//   const ghostText = document.createElement("div");
//   ghostText.style.position = "absolute";
//   ghostText.style.color = "rgba(0, 0, 0, 0.4)";
//   ghostText.style.pointerEvents = "none";
//   ghostText.style.whiteSpace = "pre-wrap";
//   ghostText.style.wordWrap = "break-word";
//   ghostText.style.overflow = "hidden";
//   ghostText.style.fontSize = "90%";

//   const computedStyles = window.getComputedStyle(textarea);
//   ghostText.style.fontSize = computedStyles.fontSize;
//   ghostText.style.fontFamily = computedStyles.fontFamily;
//   ghostText.style.lineHeight = computedStyles.lineHeight;
//   ghostText.style.padding = computedStyles.padding;
//   ghostText.style.margin = computedStyles.margin;

//   const updateGhostTextPosition = () => {
//     const rect = textarea.getBoundingClientRect();
//     ghostText.style.top = `${rect.top + window.scrollY}px`;
//     ghostText.style.left = `${rect.left + window.scrollX}px`;
//     ghostText.style.width = `${rect.width}px`;
//     ghostText.style.height = `${rect.height}px`;
//   };

//   document.body.appendChild(ghostText);
//   updateGhostTextPosition();
//   window.addEventListener("resize", updateGhostTextPosition);

//   textarea.addEventListener(
//     "input",
//     debounce(() => {
//       let userInput = textarea.value.trim();
//       if (!userInput) return;

//       // Store conversation history (keep last 10 messages)
//       conversationHistory.push(userInput);
//       if (conversationHistory.length > 10) {
//         conversationHistory.shift();
//       }

//       chrome.runtime.sendMessage(
//         {
//           type: "FETCH_AI_COMPLETION",
//           context: {
//             url: window.location.href,
//             title: document.title,
//             conversationHistory: conversationHistory.join("\n"), // Send full convo history
//           },
//         },
//         (response) => {
//           if (response?.completion) {
//             ghostText.innerText = response.completion;
//           }
//         }
//       );
//     }, 300)
//   );

//   textarea.addEventListener("keydown", (event) => {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       textarea.value += ghostText.innerText;
//       ghostText.innerText = "";
//     }
//   });
// }

// let observedEditors = new Set();

// function attachAIHandler(element) {
//   if (observedEditors.has(element)) return; // Avoid duplicate listeners
//   observedEditors.add(element);

//   const ghostText = document.createElement("div");
//   ghostText.style.position = "absolute";
//   ghostText.style.color = "rgba(0, 0, 0, 0.4)";
//   ghostText.style.pointerEvents = "none";
//   ghostText.style.whiteSpace = "pre-wrap";
//   ghostText.style.wordWrap = "break-word";
//   ghostText.style.overflow = "hidden";
//   ghostText.style.fontSize = "90%";

//   const computedStyles = window.getComputedStyle(element);
//   ghostText.style.fontSize = computedStyles.fontSize;
//   ghostText.style.fontFamily = computedStyles.fontFamily;
//   ghostText.style.lineHeight = computedStyles.lineHeight;
//   ghostText.style.padding = computedStyles.padding;
//   ghostText.style.margin = computedStyles.margin;

//   const updateGhostTextPosition = () => {
//     const rect = element.getBoundingClientRect();
//     ghostText.style.top = `${rect.top + window.scrollY}px`;
//     ghostText.style.left = `${rect.left + window.scrollX}px`;
//     ghostText.style.width = `${rect.width}px`;
//     ghostText.style.height = `${rect.height}px`;
//   };

//   document.body.appendChild(ghostText);
//   updateGhostTextPosition();
//   window.addEventListener("resize", updateGhostTextPosition);

//   element.addEventListener(
//     "input",
//     debounce(() => {
//       let userInput = element.innerText.trim();
//       if (!userInput) return;

//       chrome.runtime.sendMessage(
//         {
//           type: "FETCH_AI_COMPLETION",
//           context: {
//             url: window.location.href,
//             title: document.title,
//             userInput: userInput,
//           },
//         },
//         (response) => {
//           if (response?.completion) {
//             ghostText.innerText = response.completion;
//           }
//         }
//       );
//     }, 500)
//   ); // Slightly increased debounce to reduce lag

//   element.addEventListener("keydown", (event) => {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       element.innerText += ghostText.innerText;
//       ghostText.innerText = "";
//     }
//   });
// }

// // **Only attach to Gmail’s active email editor**
// function detectGmailEditor() {
//   const gmailEditor = document.querySelector("div[contenteditable='true']");
//   if (gmailEditor) attachAIHandler(gmailEditor);
// }

// // **MutationObserver with performance optimization**
// const observer = new MutationObserver(() => {
//   detectGmailEditor();
// });

// observer.observe(document.body, { childList: true, subtree: true });

// // **Run detection once on load**
// detectGmailEditor();

let observedGmailEditor = null;

function attachAIHandler(element) {
  if (!element || element.dataset.aiEnhanced) return; // Prevent multiple bindings
  element.dataset.aiEnhanced = "true";

  const ghostText = document.createElement("div");
  ghostText.style.position = "absolute";
  ghostText.style.color = "rgba(0, 0, 0, 0.4)";
  ghostText.style.pointerEvents = "none";
  ghostText.style.whiteSpace = "pre-wrap";
  ghostText.style.wordWrap = "break-word";
  ghostText.style.overflow = "hidden";
  ghostText.style.fontSize = "90%";

  const computedStyles = window.getComputedStyle(element);
  ghostText.style.fontSize = computedStyles.fontSize;
  ghostText.style.fontFamily = computedStyles.fontFamily;
  ghostText.style.lineHeight = computedStyles.lineHeight;
  ghostText.style.padding = computedStyles.padding;
  ghostText.style.margin = computedStyles.margin;

  const updateGhostTextPosition = () => {
    const rect = element.getBoundingClientRect();
    ghostText.style.top = `${rect.top + window.scrollY}px`;
    ghostText.style.left = `${rect.left + window.scrollX}px`;
    ghostText.style.width = `${rect.width}px`;
    ghostText.style.height = `${rect.height}px`;
  };

  document.body.appendChild(ghostText);
  updateGhostTextPosition();
  window.addEventListener("resize", updateGhostTextPosition);

  element.addEventListener(
    "input",
    debounce(() => {
      let userInput = element.innerText.trim();
      if (!userInput) return;

      chrome.runtime.sendMessage(
        {
          type: "FETCH_AI_COMPLETION",
          context: {
            url: window.location.href,
            title: document.title,
            userInput: userInput,
          },
        },
        (response) => {
          if (response?.completion) {
            ghostText.innerText = response.completion;
          }
        }
      );
    }, 500)
  ); 

  element.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      element.innerText += ghostText.innerText;
      ghostText.innerText = "";
    }
  });

  observedGmailEditor = element; // Store the observed editor
}

// **Detect Gmail's active email composer safely**
function detectGmailEditor() {
  const gmailEditor = document.querySelector("div[contenteditable='true']");

  if (gmailEditor && gmailEditor !== observedGmailEditor) {
    attachAIHandler(gmailEditor);
  }
}

// **Use a safer MutationObserver that only checks Gmail’s compose box**
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      detectGmailEditor();
    }
  }
});

// **Only observe the Gmail compose area (not the entire page)**
const gmailComposeArea = document.querySelector("body");
if (gmailComposeArea) {
  observer.observe(gmailComposeArea, { childList: true, subtree: true });
}

// **Run detection once on load**
detectGmailEditor();
