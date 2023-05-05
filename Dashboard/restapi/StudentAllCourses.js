 // Make an HTTP GET request to an API endpoint
 axios.post('http://localhost:8080/courses/list')
 .then(httpResponse => {
       form.reset()
       console.log(httpResponse)

       return httpResponse.data
       .catch(err => {
         console.log(err)
         const errDv = document.getElementById('errMsg')
         errDv.style.display = 'block'
         errDv.innerHTML = `<strong>${err.response.data.msg}</strong>`
     })
     // .finally(function () {
     //     // always executed
     //
 });

