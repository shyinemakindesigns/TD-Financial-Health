(function () {
  if (!window.location.search.includes("code=")) {
  console.log("No error code found, skipping error script.");
  return;
}

const ErrorMap = {
  400: {
    title: "400 - Bad Request",
    message: "Please check your information and try again.",
  },
  401: {
    title: "401 - Unauthorized",
    message: "Authorization error. Please contact support.",
  },
  404: {
    title: "404 - Not Found",
    message: "Service unavailable. Please try again.",
  },
  500: {
    title: "500 - Internal Server Error",
    message: "Something went wrong on our side. Please try again soon.",
  },
};

function getErrorCode() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  
  if (ErrorMap [code]) {
    return Number(code);
    } else {
    return 404;
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const errorCode = getErrorCode();
  const errorData = ErrorMap [errorCode];

  const titleError = document.querySelector(".error__title");
  if (titleError) titleError.textContent = errorData.title;

  const messageError = document.querySelector(".error__message");
  if (messageError) messageError.textContent = errorData.message;

  document.title = errorData.title;
});
})();
