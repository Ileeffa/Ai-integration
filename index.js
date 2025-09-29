// frontend/index.js – uses SheCodes AI API (no backend required)

document.getElementById("skincare-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get the user input from the form
  const input = document.getElementById("user-input").value.trim();
  const resultDiv = document.getElementById("result");

  // Show loading message
  resultDiv.innerHTML = "✨ Generating your skincare routine...";

  // ✅ Replace this with your actual SheCodes AI key from your account
  const apiKey = "your_real_shecodes_api_key_here";

  // Provide a helpful context to guide the AI's response
  const context = "You are a professional skincare expert. Based on the prompt, generate a complete skincare routine with detailed product types and step-by-step instructions.";

  try {
    // Build the full API URL
    const url = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(input)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

    // Make the API call
    const response = await fetch(url);
    const data = await response.json();

    // 🔍 Log the API response for debugging
    console.log("API Response:", data);

    // Show the AI-generated answer or a fallback message
    if (data.answer) {
      resultDiv.innerHTML = `<pre>${data.answer}</pre>`;
    } else {
      resultDiv.innerHTML = "🧴 Sorry, no skincare advice was returned. Try using a more specific prompt!";
    }
  } catch (error) {
    // Handle any connection or fetch errors
    resultDiv.innerHTML = "❌ Something went wrong. Please try again.";
    console.error("API Error:", error);
  }
});
