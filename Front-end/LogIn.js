// Get the form element
const form = document.querySelector('form');

// Add a submit event listener to the form
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the email and password fields
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Perform validation
  if (!email.trim()) {
    alert('Please enter your email');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email');
    return;
  }

  if (!password.trim()) {
    alert('Please enter your password');
    return;
  }

  // Send a POST request to the server to submit the form data
  axios.post('/login', {
    email: email,
    password: password
  })
  .then(function (response) {
    console.log(response);
    // Navigate to the student home page
    window.location.href = 'Homepg.html';
  })
  .catch(function (error) {
    console.log(error);
    alert('An error occurred while processing your request. Please try again later.');
  });
});

// Function to validate email addresses
function isValidEmail(email) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}
