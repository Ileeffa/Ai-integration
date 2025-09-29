document.getElementById("skincare-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const input = document.getElementById("user-input").value.trim();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "✨ Generating your skincare routine...";

  const apiKey = "9005af4bd71750f1o487b22bt9e35823"; // ✅ Your real API key
  const context = "You are a professional skincare expert. Based on the user's prompt, generate a complete, clear, step-by-step skincare routine.";

  try {
    const url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(input)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // 🔍 Log the full response to help debug
    console.log("✅ API Response:", data);

    if (data.answer) {
      resultDiv.innerHTML = `<pre>${data.answer}</pre>`;
    } else {
      resultDiv.innerHTML = "🧴 Sorry, no skincare advice was returned. Try a different or more specific prompt.";
    }
  } catch (error) {
    resultDiv.innerHTML = "❌ Something went wrong. Please try again.";
    console.error("API Error:", error);
  }
});
