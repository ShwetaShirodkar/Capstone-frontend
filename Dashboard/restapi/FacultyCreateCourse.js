function createNewCourse(course, form)
{
    const headers = {
        'content-type' : 'application/json'
    }


    axios.post('http://localhost:8080/courses/createNewCourse', course, { headers })
    
         .then(res => {
            // console.log(res)
                form.reset()
                window.alert("Course added successfully")
                
                window.location.href="#"
            
         })

         .catch(err => console.log(err))
         
}

function setupForm()
{
    const err = document.getElementById('errMsg')
    err.style.display = 'none'
    const formCreateCourse= document.getElementById('formCreateCourse')

    formCreateCourse.onsubmit = ev => {
        ev.preventDefault()
        console.log(ev)

       
        const formData = new FormData(ev.target)

        for(let key of formData.keys())
        {
            console.log(key)
        }

        for(let val of formData.values())
        {
            console.log(val)
        }

        const course = Object.fromEntries(formData.entries())
        console.log(course)


        createNewCourse(course, formCreateCourse)
    }
}

setupForm()

// function showSuccessModal() {
//     const myModalEl = document.getElementById('successModal');
//     const modal = new bootstrap.Modal(myModalEl)
//     modal.show()
// }