const validateForm = ({ userName, password }) => {

  if (userName.length <= 0) return { msg: 'invalid username', sts: false}
  if (password.length <= 0) return { msg: 'invalid password', sts: false }
 

  return { sts : 'success', msg :'all fields are valid' }
}

function setupForm() {

  const err = document.getElementById('errMsg')
  err.style.display = 'none'

  const formSignup = document.getElementById('formLogin')

  formSignup.onsubmit = ev => { // when form is submitted, this function would be called

      ev.preventDefault() // stop the default behaviour of refreshing the page

      const formData = new FormData(ev.target) // ev.target points to form tag in the html

      const user = Object.fromEntries(formData.entries()) // you are converting form data to js object
      console.log(user)

      const { sts, msg } = validateForm(user)

      if (sts) apiLogin(user, formSignup)
      else {
          err.style.display = 'block'
          err.innerHTML = `<strong>${msg}</strong>`
      }
  }
}

setupForm()

function apiLogin(user, form) {
  const headers = {
      'content-type': 'application/json'
  }

  axios.post('http://localhost:8080/user/loginv2', user, { headers })
      .then(httpResponse => {
          form.reset()
          console.log(httpResponse)

          return httpResponse.data

      }).then(data => {
          const { role,userId } = data.bd
          localStorage.setItem("userId", userId)
          if(role == 'faculty') window.location.href = '../Dashboard/FacultyCreateCourse.html'
          else if(role == "user") window.location.href = '../Dashboard/StudentAllCourses.html'
          else window.location.href = '../Dashboard/AdminAddRoles.html'
      } )
      .catch(err => {
                console.log(err)
                const errDv = document.getElementById('errMsg')
                let errMsg = 'Wrong user ID or password. Please try again.'
                errDv.style.display = 'block'
                errDv.innerHTML = `<strong>${errMsg}</strong>`
      })
}