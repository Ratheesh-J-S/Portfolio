document.getElementById("contactForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const form = event.target;
  const loadingElement = document.querySelector(".loading");
  const errorMessageElement = document.querySelector(".error-message");
  const sentMessageElement = document.querySelector(".sent-message");

  loadingElement.style.display = "block";
  errorMessageElement.style.display = "none";
  sentMessageElement.style.display = "none";

  try {
    const formData = new FormData(form);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    loadingElement.style.display = "none";

    if (response.ok) {
      sentMessageElement.style.display = "block";
      form.reset();

      setTimeout(() => {
        sentMessageElement.style.display = "none";
      }, 5000);
    } else {
      throw new Error("Something went wrong.");
    }
  } catch (error) {
    loadingElement.style.display = "none";
    errorMessageElement.textContent = "Failed to send message. Please try again.";
    errorMessageElement.style.display = "block";
  }
});