function apiCreateNewCourse(course, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/course/', course, {headers})
        .then(res => {
            form.reset()
            window.alert("Course added successfully")
            
            window.location.href="../Faculty/list-course.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const formCourse=document.getElementById('formCourse')
    formCourse.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const course = Object.fromEntries(formData.entries())
        console.log(course)
        apiCreateNewCourse(course, formCourse)
    }
}
