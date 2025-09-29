function displayRoutine(response) {
  console.log("💬 API Response:", response);

  const resultElement = document.querySelector("#result");

  if (response.data && response.data.answer) {
    // Use Typewriter animation
    new Typewriter("#result", {
      strings: response.data.answer,
      autoStart: true,
      delay: 1,
      cursor: "",
    });
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
  const context =
    "You are a professional skincare expert. Based on the prompt, generate a complete skincare routine with product types and friendly step-by-step instructions. Keep the advice beginner-friendly.";

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
