$(document).ready(function () {
  $("#myForm").submit(function (e) {
    e.preventDefault();

    // Get values
    const username = $("#username").val().trim();
    const email = $("#email").val().trim();

    let isValid = true;

    // Username validation
    if (username === "") {
      showError("username", "Username is required");
      isValid = false;
    } else if (username.length < 3) {
      showError("username", "Username must be at least 3 characters");
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      showError("email", "Email is required");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      showError("email", "Please enter a valid email");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
      this.reset();
    }
  });

  // Helper function to show errors
  function showError(fieldId, message) {
    $(`#${fieldId}`).addClass("error-border");
    $(`#${fieldId}Error`).text(message);
  }

  // Real-time validation
  $("input").on("input", function () {
    $(this).removeClass("error-border");
    $(this).next(".error").text("");
  });
});
