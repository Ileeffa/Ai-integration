// frontend/index.js
document.getElementById("skincare-form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const input = document.getElementById("user-input").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Generating your skincare routine...";

  try {
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();
    resultDiv.innerHTML = `<pre>${data.routine}</pre>`;
  } catch (error) {
    resultDiv.innerHTML = "Something went wrong. Please try again.";
    console.error(error);
  }
});
