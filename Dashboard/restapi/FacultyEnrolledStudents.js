function setupTable() {
    const table = document.getElementById('tableEnrolledStudents')

    // const btnSearch = document.getElementById('btnSearch')
    
    // btnSearch.onclick = () =>   {

    //     const api=apiFetchBooking(table, document.getElementById('txtUsername').value )
    //     console.log(api)
    // }

    
    
    apiFetchAllEnrollments(table)
}

 setupTable()




 function propulateActualData(table, userEnrollments) {
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
    for(const userEnrollment of userEnrollments) {
        console.log(userEnrollment)
        const { userName, courseName, facultyName } = userEnrollment

        const row = table.insertRow()
        row.insertCell(0).innerHTML = userName
        row.insertCell(1).innerHTML = courseName
        row.insertCell(2).innerHTML = facultyName  
        row.insertCell(3).innerHTML = `
      
        
    `       
    }

    
}



function apiFetchAllEnrollments(table) {
    axios.get('http://localhost:8080/user/allStudentEnrolled')
        .then(res => {
           
            const { data } = res
             
            const { sts, msg, bd } = data

            propulateActualData(table, bd)
        })
        .catch(err => console.log(err))
}