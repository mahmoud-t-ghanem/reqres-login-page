let spinner = document.getElementById("spinner");
spinner.style.display = "none";

let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("email-container").style.borderColor = "#0d0d0d";
  document.getElementById("password-container").style.borderColor = "#0d0d0d";
  document.getElementById("error-msg").style.display = "none";
  spinner.style.display = "block";
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let data = {
    email: email,
    password: password,
  };

  let config = {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  };

  axios
    .post("https://reqres.in/api/login", data, config)
    .then((response) => {
      let token = response.data.token;
      localStorage.setItem("Token", token);
      window.location.href = "successfully-login.html";
    })
    .catch((error) => {
      let errorMsg = error.response.data.error;
      let errorElement = document.getElementById("error-msg");
      errorElement.innerHTML = errorMsg;
      errorElement.style.display = "block";
      switch (errorMsg) {
        case "Missing email or username":
          document.getElementById("email-container").style.borderColor = "red";
          document.getElementById("email").focus();
          break;
        case "Missing password":
          document.getElementById("password-container").style.borderColor =
            "red";
          document.getElementById("password").focus();
          break;
        case "user not found":
          document.getElementById("email-container").style.borderColor = "red";
          document.getElementById("password-container").style.borderColor =
            "red";
          document.getElementById("email").focus();
          break;
        default:
          break;
      }
    })
    .finally(() => {
      spinner.style.display = "none";
    });
});
