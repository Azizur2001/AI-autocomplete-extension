// const observeTextareas = new MutationObserver(() => {
//   document.querySelectorAll("textarea").forEach((textarea) => {
//     if (!textarea.dataset.autoTab) {
//       textarea.dataset.autoTab = "true";
//       attachAIHandler(textarea);
//     }
//   });
// });

// observeTextareas.observe(document.body, { childList: true, subtree: true });

// function attachAIHandler(textarea) {
//   const ghostText = document.createElement("div");
//   ghostText.style.position = "absolute";
//   ghostText.style.opacity = "0.5";
//   ghostText.style.pointerEvents = "none";
//   ghostText.style.color = "gray";
//   ghostText.style.fontSize = getComputedStyle(textarea).fontSize;
//   ghostText.style.fontFamily = getComputedStyle(textarea).fontFamily;
//   textarea.parentNode.appendChild(ghostText);

//   textarea.addEventListener("input", () => {
//     chrome.runtime.sendMessage(
//       { type: "FETCH_AI_COMPLETION", text: textarea.value },
//       (response) => {
//         if (response?.completion) {
//           ghostText.innerText = response.completion;
//         }
//       }
//     );
//   });

//   textarea.addEventListener("keydown", (event) => {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       textarea.value += ghostText.innerText;
//       ghostText.innerText = "";
//     }
//   });
// }

// function attachAIHandler(textarea) {
//   // Create ghost text overlay
//   const ghostText = document.createElement("div");
//   ghostText.style.position = "absolute";
//   ghostText.style.color = "rgba(0, 0, 0, 0.5)"; // Lighter gray for ghost text
//   ghostText.style.pointerEvents = "none";
//   ghostText.style.whiteSpace = "pre"; // Preserve spaces & line breaks
//   ghostText.style.overflow = "hidden";

//   // Match textarea styles dynamically
//   const computedStyles = window.getComputedStyle(textarea);
//   ghostText.style.fontSize = computedStyles.fontSize;
//   ghostText.style.fontFamily = computedStyles.fontFamily;
//   ghostText.style.lineHeight = computedStyles.lineHeight;
//   ghostText.style.padding = computedStyles.padding;
//   ghostText.style.margin = computedStyles.margin;

//   // Position ghost text exactly on top of textarea
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

//   // Listen for input events to fetch AI completions
//   textarea.addEventListener(
//     "input",
//     debounce(() => {
//       chrome.runtime.sendMessage(
//         { type: "FETCH_AI_COMPLETION", text: textarea.value },
//         (response) => {
//           if (response?.completion) {
//             ghostText.innerText = response.completion;
//           }
//         }
//       );
//     }, 500)
//   );

//   // Accept AI completion when Tab is pressed
//   textarea.addEventListener("keydown", (event) => {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       textarea.value += ghostText.innerText;
//       ghostText.innerText = "";
//     }
//   });
// }

// additional feature for context

// function attachAIHandler(textarea) {
//   const ghostText = document.createElement("div");
//   ghostText.style.position = "absolute";
//   ghostText.style.color = "rgba(0, 0, 0, 0.4)";
//   ghostText.style.pointerEvents = "none";
//   ghostText.style.whiteSpace = "pre-wrap"; // ✅ Enables multiline completions
//   ghostText.style.wordWrap = "break-word"; // ✅ Prevents overflow
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
//       chrome.runtime.sendMessage(
//         {
//           type: "FETCH_AI_COMPLETION",
//           context: {
//             url: window.location.href,
//             title: document.title,
//             userInput: textarea.value,
//           },
//         },
//         (response) => {
//           if (response?.completion) {
//             ghostText.innerText = response.completion;
//           }
//         }
//       );
//     }, 500)
//   );

//   textarea.addEventListener("keydown", (event) => {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       textarea.value += ghostText.innerText;
//       ghostText.innerText = "";
//     }
//   });
// }

// deepseek
function attachAIHandler(textarea) {
  const ghostText = document.createElement("div");
  ghostText.style.position = "absolute";
  ghostText.style.color = "rgba(0, 0, 0, 0.4)";
  ghostText.style.pointerEvents = "none";
  ghostText.style.whiteSpace = "pre-wrap";
  ghostText.style.wordWrap = "break-word";
  ghostText.style.overflow = "hidden";
  ghostText.style.fontSize = "90%";

  const computedStyles = window.getComputedStyle(textarea);
  ghostText.style.fontSize = computedStyles.fontSize;
  ghostText.style.fontFamily = computedStyles.fontFamily;
  ghostText.style.lineHeight = computedStyles.lineHeight;
  ghostText.style.padding = computedStyles.padding;
  ghostText.style.margin = computedStyles.margin;

  const updateGhostTextPosition = () => {
    const rect = textarea.getBoundingClientRect();
    ghostText.style.top = `${rect.top + window.scrollY}px`;
    ghostText.style.left = `${rect.left + window.scrollX}px`;
    ghostText.style.width = `${rect.width}px`;
    ghostText.style.height = `${rect.height}px`;
  };

  document.body.appendChild(ghostText);
  updateGhostTextPosition();
  window.addEventListener("resize", updateGhostTextPosition);

  textarea.addEventListener(
    "input",
    debounce(() => {
      chrome.runtime.sendMessage(
        {
          type: "FETCH_AI_COMPLETION",
          context: {
            url: window.location.href,
            title: document.title,
            userInput: textarea.value,
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

  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      textarea.value += ghostText.innerText;
      ghostText.innerText = "";
    }
  });
}
