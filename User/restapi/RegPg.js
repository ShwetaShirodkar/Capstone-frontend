const validateForm = ({ userName, password, role }) => {

  const passwordValidation = validatePassword(password); 
  if (!passwordValidation.sts) {
      return { msg: passwordValidation.message, sts: false };
  }

  const roles = ['faculty', 'user']

  if (userName.length <= 0) return { msg: 'invalid username', sts: false}
  if (password.length <= 0) return { msg: 'invalid password', sts: false }
  if((role.length <= 0) || !roles.includes(role)) return { msg: 'invalid role', sts: false }

  return { sts : 'success', msg :'all fields are valid' }
}


const validatePassword = (password) => {
  if (password.length < 8) {
      return { sts: false, message: 'Password must be at least 8 characters long.' };
  }

  if (!/[A-Z]/.test(password)) {
      return { sts: false, message: 'Password must contain at least one uppercase letter.' };
  }

  if (!/[a-z]/.test(password)) {
      return { sts: false, message: 'Password must contain at least one lowercase letter.' };
  }

  if (!/\d/.test(password)) {
      return { sts: false, message: 'Password must contain at least one number.' };
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return { sts: false, message: 'Password must contain at least one special character.' };
  }

  return { sts: true, message: 'Password is valid.' };
};


function setupForm() {

  const err = document.getElementById('errMsg')
  err.style.display = 'none'

  const formSignup = document.getElementById('formSignup')

  formSignup.onsubmit = ev => { // when form is submitted, this function would be called

      ev.preventDefault() // stop the default behaviour of refreshing the page

      const formData = new FormData(ev.target) // ev.target points to form tag in the html

      const user = Object.fromEntries(formData.entries()) // you are converting form data to js object
      console.log(user)

      const { sts, msg } = validateForm(user)

      if (sts) apiSignup(user, formSignup)
      else {
          err.style.display = 'block'
          err.innerHTML = `<strong>${msg}</strong>`
      }
  }
}

setupForm()

function apiSignup(user, form) {
  const headers = {
      'content-type': 'application/json'
  }

  axios.post('http://localhost:8080/user/', user, { headers })
      .then(res => {
          form.reset()
          showSuccessModal()
      }).catch(err => console.log(err))
}

function showSuccessModal() {
  const myModalEl = document.getElementById('successModal');
  const modal = new bootstrap.Modal(myModalEl)
  modal.show()
}