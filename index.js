function displayRoutine(response) {
  new Typewriter("#result", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generateRoutine(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "2046c535afeb092fo82f1d306d8a2b2t";
  let context =
    "You are a professional skincare expert. Based on the prompt, generate a full skincare routine with product types, step-by-step instructions, and friendly explanations. Keep the advice easy to follow and beginner-friendly.";
  let prompt = `Skincare request: ${instructionsInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let resultElement = document.querySelector("#result");
  resultElement.classList.remove("hidden");
  resultElement.innerHTML = `<div class="generating">🧴 Creating a personalized skincare routine for: <strong>${instructionsInput.value}</strong></div>`;

  axios.get(apiURL).then(displayRoutine).catch(function (error) {
    resultElement.innerHTML = "❌ Something went wrong. Please check your input or try again later.";
    console.error("API Error:", error);
  });
}

let formElement = document.querySelector("#skincare-form");
formElement.addEventListener("submit", generateRoutine);
