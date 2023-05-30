function setUpTable() {
    const table = document.getElementById('tableCourse')
    apiFetchAllUsers(table)
  }

setUpTable()



function propulateActualData(table, courses) {
    while (table.rows.length > 0) {
        table.deleteRow(table.rows.length - 1);
    }
    for(const course of courses) {

        const { userId, userName,role } = course

        const updatePageUrl = `./AdminUpdateUser.html?userId=${userId}`
        const viewPageUrl = `./CourseDetails.html?userId=${userId}`


        const row = table.insertRow()
        row.insertCell(0).innerHTML = userId
        row.insertCell(1).innerHTML = userName
        row.insertCell(2).innerHTML = role   
      
        row.insertCell(3).innerHTML = `
       
        <a class = "btn btn-primary" href='${updatePageUrl}'>Update</a>
        <a class='btn btn-danger' href='#' onclick='showConfirmDeleteModal(${userId})'>Delete</a>`
    }
}

function apiFetchAllUsers(table) {
    axios.get('http://localhost:8080/user/users')
        .then(res => {
           
            const { data } = res
             
            const { sts, msg, bd } = data

            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
}


function apiCallDeleteCourse(userId, modal) {
    const url = `http://localhost:8080/user/delete/${userId}`

    axios.delete(url)
        .then(res => res.data) // you converted complete response in to our business reponse
        // .then( data => console.log(data.msg) ) // this line can be written in destructured form as below
        .then( ({ sts, msg, bd }) =>  modal.hide())
        .then (window.location.reload())
        .catch(console.log)
}
function showConfirmDeleteModal(userId) {
    console.log('clicked ' + userId)
    const myModalEl = document.getElementById('deleteModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()

    const btDl = document.getElementById('btDl')
    btDl.onclick = () => {
        apiCallDeleteCourse(userId, modal)
        
        window.location.reload()
        
    }
}
