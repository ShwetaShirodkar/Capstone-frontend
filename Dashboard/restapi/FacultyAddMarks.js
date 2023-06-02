const validateForm= ({name, marks, grade, feedback}) => {

    if (name.length <= 0) return { msg: 'Enter student name', sts: false }
    if (marks.length <= 0) return { msg: 'Enter marks', sts: false }
    let dropDown= document.getElementById("grade");
    let selectedOption= dropDown.v;
    if (selectedOption === "") return { msg: 'Please select the grade', sts: false }

    return { sts: 'success', msg: 'All fields are valid' }
  
}


function apiCreateNewMark(mark, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post('http://localhost:8080/mark/', mark, {headers})
        .then(res => {
            form.reset()
            window.alert("Marks added successfully")
            
            window.location.href="./FacultyListMark.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formMark=document.getElementById('formMark')
    formMark.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const mark = Object.fromEntries(formData.entries())
        console.log(mark)
        const {sts, msg} = validateForm(mark)
        if (sts) apiCreateNewMark(mark, formMark)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()