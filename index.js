function displayRoutine(response) {
  const resultElement = document.querySelector("#result");

  if (response.data && response.data.answer) {
    // Since the AI is returning raw HTML, just insert it directly
    resultElement.innerHTML = response.data.answer;
  } else {
    resultElement.innerHTML = `
      ❌ No routine returned from the API.<br><br>
      <code>${JSON.stringify(response.data, null, 2)}</code>`;
  }
}

function generateRoutine(event) {
  event.preventDefault();

  const input = document.getElementById("user-instructions").value.trim();
  const resultElement = document.getElementById("result");

  resultElement.innerHTML = `🧴 Creating a personalized skincare routine for: <strong>${input}</strong>`;

  const apiKey = "2046c535afeb092fo82f1d306d8a2b2t"; // ✅ Your SheCodes API key

  // 🧼 Updated context to return real HTML instead of markdown
  const context =
    "You are a professional skincare expert. Based on the prompt, return a complete skincare routine using proper HTML formatting. Use <h3> for section headings, <ul> and <li> for steps, and <p> for descriptions. Avoid markdown or asterisks — use valid HTML tags only.";

  const prompt = `Skincare request: ${input}`;
  const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  axios
    .get(apiURL)
    .then(displayRoutine)
    .catch(function (error) {
      resultElement.innerHTML = "❌ Something went wrong. Please try again.";
      console.error("API Error:", error);
    });
}

document
  .getElementById("skincare-form")
  .addEventListener("submit", generateRoutine);
