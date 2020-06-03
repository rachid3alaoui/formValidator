const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmation');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show succcess outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function getFieldName(field) {
  return field.id.charAt(0).toUpperCase() + field.id.slice(1);
}

// check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else if (input.value.trim() == '') {
    showError(input, `${getFieldName(input)} is required`);
  } else {
    showError(input, 'Email is not valid');
  }
}

// check is the passwords much

function checkMatch(passwordInput, confirmationInput) {
  if (passwordInput.value !== confirmationInput.value) {
    showError(confirmationInput, "Passwords don't match");
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Event listeners
form.addEventListener('submit', (e) => {
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkLength(confirmPassword, 6, 20);
  checkEmail(email);
  checkMatch(password, confirmPassword);
  e.preventDefault();
});
