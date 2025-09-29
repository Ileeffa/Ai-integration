// frontend/index.js – using SheCodes AI API

document.getElementById("skincare-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const input = document.getElementById("user-input").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Generating your skincare routine...";

  const apiKey = "YOUR_SHECODES_API_KEY"; // 
  const context = "You are a skincare expert. Based on the prompt, generate a full skincare routine with products and steps.";

  try {
    const url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(input)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.answer) {
      resultDiv.innerHTML = `<pre>${data.answer}</pre>`;
    } else {
      resultDiv.innerHTML = "Sorry, no skincare advice returned.";
    }
  } catch (error) {
    resultDiv.innerHTML = "Something went wrong. Please try again.";
    console.error("API Error:", error);
  }
});
