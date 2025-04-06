document.getElementById("saveSettings").addEventListener("click", () => {
  const writingStyle = document.getElementById("writingStyle").value;
  const maxTokens = parseInt(document.getElementById("maxTokens").value);
  const aiModel = document.getElementById("aiModel").value;

  chrome.storage.local.set({ writingStyle, maxTokens, aiModel }, () => {
    alert("Settings saved!");
  });
});

// Load saved settings
chrome.storage.local.get(["writingStyle", "maxTokens", "aiModel"], (data) => {
  if (data.writingStyle)
    document.getElementById("writingStyle").value = data.writingStyle;
  if (data.maxTokens)
    document.getElementById("maxTokens").value = data.maxTokens;
  if (data.aiModel) document.getElementById("aiModel").value = data.aiModel;
});


