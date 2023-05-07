const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

console.log(readIdQueryParam())

function apiGetCourseDetails() {
    const id = readIdQueryParam()
    axios.get(`http://localhost:8080/courses/getCourseById/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateForm(document.getElementById('formCourse'), data.bd))
        .catch(err => console.log(err))
}

function apiUpdateExistingForm(course, form) {
    const id = readIdQueryParam()
    axios.put(`http://localhost:8080/courses/updateCourse/${id}`, course)
        .then(httpResponse => {
            httpResponse.data
            window.alert("Course updated successfully")
            window.location.href= "./FacultyManageCourse.html"
        })
        .then(data => {
            console.log(data.msg)
        
        })
        .catch(err => console.log(err))
}

function populateForm(form, data) {
    console.log(data)
    const { elements } = form; 
    console.log(elements)

    const entries = Object.entries(data) 
    console.log(entries)

    for (const entry of entries) {
        
        console.log(entry)
        const [key, value] = entry
        const inputField = elements.namedItem(key)
        console.log(inputField)
        if (inputField) inputField.value = value
    }

}

function setupForm() {
    const formCourse = document.getElementById('formCourse')

    formCourse.onsubmit = ev => { 
        const formData = new FormData(ev.target)

        ev.preventDefault() 
        console.log(ev)

        const rawData = Object.fromEntries(formData.entries()) // you are converting form data to js object
        console.log(rawData)

        const id = readIdQueryParam()

    
        const course = { ...rawData, id }
        console.log(course)

        apiUpdateExistingForm(course, formCourse) // we are pass form object to reset the form on success
    }
}


setupForm()

apiGetCourseDetails()
