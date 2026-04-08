document.addEventListener("DOMContentLoaded", function () {
   // Update with your form's id
  const form = document.getElementById("signupForm");

  // Should match button type
  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent page reload

    // Match each elements id for each label in your form
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");

    // Clear old errors
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    let hasError = false;

    // ---- Input Validation ----
    const hasNumber = /\d/; // regex: checks for any digit 0–9
    const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

    if (hasNumber.test(firstName)) {
      firstNameError.textContent = "First name cannot contain numbers.";
      hasError = true;
    }

    if (hasNumber.test(lastName)) {
      lastNameError.textContent = "Last name cannot contain numbers.";
      hasError = true;
    }

    if (!emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid email (must end with .com, .ca, .io, etc).";
      hasError = true;
    }
    // stops execution if the form has an error
    if (hasError) return;

    try {
      const checkAPI = await axios.get(
        "https://industry-sprint-api-365b460ef11e.herokuapp.com/signups",
        { params: { api_key: APIKey } }
      );

      const allSignups = checkAPI.data;
      const emailExists = allSignups.some(entry => entry.email === email);

      if (emailExists) {
        emailError.textContent = "This email has already been registered.";
        return; 
      }
    } catch (err) {
      console.error("Error checking existing emails:", err);
      return;
    }
    // This creates the data that will be sent to the API, no need to change this
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email
    };

// Enable the below to force error code 400 upon form submission
// payload.firstName = null; 

    // This will be your API key but I think you can just keep mine
    // const apiKey = "fea58e34-f7f6-4226-84ee-a90fb1b24043";

    // This performs the POST request with our data
    try {
      const response = await axios.post(
        "https://industry-sprint-api-365b460ef11e.herokuapp.com/signups", // Any error with this URL will cause 404-Not Found
        payload,
        { params: { api_key: APIKey } }
      );

      // Success — axios only reaches here for 2xx
      form.reset();
      window.location.href = "../join/confirm/confirm.html";

    } catch (error) {
      // Axios gives error.response for API errors
      if (error.response) {
        const status = error.response.status;

        switch (status) {
          case 400:
            window.location.href = "../error.html?code=400";
            break;
          case 401:
            window.location.href = "../error.html?code=401";
            break;
          case 404:
            window.location.href = "../error.html?code=404";
            break;
          default:
            window.location.href = "../error.html?code=500";
            break;
        }

      } else {
        // Network error (server down, no internet, CORS, etc.)
        console.error("Network error:", error);
        window.location.href = "../../error/error.html?code=500";
      }
    }
  });
});

