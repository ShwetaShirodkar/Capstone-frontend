const validateForm= ({date, notification}) => {

    if (notification.length <= 0) return { msg: 'Enter the notification', sts: false }
    const currentDate= new Date();
    if (date <currentDate) return { msg: 'Past date should not be selected', sts: false }

    return { sts: 'success', msg: 'All fields are valid' }
  
}







function apiCreateNewNotification(notification, form){
    const headers= {
        'content-type' : 'application/json'
    }
    axios.post(`http://localhost:8080/notification/`, notification, {headers})
        .then(res => {
            form.reset()
            window.alert("Notification added successfully")
            
            window.location.href="./FacultyListNotification.html"
            //showSuccessModal()
        })
        .catch(err => console.log(err))

}

function setUpForm(){
    const err=document.getElementById('errDiv')
    err.style.display='none'
    const formNotification=document.getElementById('formNotification')
    formNotification.onsubmit=ev => {
        ev.preventDefault()
        console.log(ev)
        const formData = new FormData(ev.target)
        const notification = Object.fromEntries(formData.entries())
        console.log(notification)
        const {sts, msg} = validateForm(notification)
        if (sts) apiCreateNewNotification(notification, formNotification)
        else{
            err.style.display='block'
            err.innerHTML=`<strong>${msg}</strong>`
        }
    }
}

 setUpForm()