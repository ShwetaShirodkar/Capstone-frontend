const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
  }
  
  function setUpTable() {
    const table = document.getElementById('tableCourse')
    apiFetchCourse(table)
  }
  
  setUpTable()
  
  function populateActualData(table, courses) {
    const grid = document.createElement('div')
    grid.classList.add('newcard-grid')
    if (!Array.isArray(courses)) {
      courses = [courses]
    }
    for (const course of courses) {
        const { courseId, courseName, facultyName, startDate, endDate } = course
        const card = document.createElement('div')
        card.classList.add('card')
        const header = document.createElement('h2')
        header.innerHTML = courseName
        const faculty = document.createElement('p')
        faculty.innerHTML = `Faculty: ${facultyName}`
        const dates = document.createElement('p')
        dates.innerHTML = `Schedule: ${startDate} to ${endDate}`
        // const updateButton = document.createElement('button')
        // updateButton.innerHTML = 'Enroll'
        // updateButton.classList.add('btn', 'btn-success')
        // updateButton.setAttribute('data-id', courseId)
        // updateButton.addEventListener('click', (event) => {
        //   const courseId = event.target.getAttribute('data-id')
        //   window.location.href = `./ViewCourse.html?id=${courseId}`
        // })
        card.appendChild(header)
        card.appendChild(faculty)
        card.appendChild(dates)
        // card.appendChild(updateButton)
        grid.appendChild(card)
      }
      table.appendChild(grid)
    }
  
  
  function apiFetchCourse(table) {
    const id = readIdQueryParam()
    axios.get(`http://localhost:8080/courses/getCourseById/${id}`)
        .then(res => {
            const { data } = res
            console.log(data)
            const { sts, msg, bd } = data
            populateActualData(table, bd)
        })
        .catch(err => console.log(err))
  }

  function enrollByUserId() {
    const userId = localStorage.getItem("userId");
  
    const courseId = readIdQueryParam()
    console.log(userId,courseId)
    
    const headers = {
        'content-type': 'application/json'
    }
    axios.post(`http://localhost:8080/user/${userId}/userEnrollments/${courseId}`, { headers })
  
    .then(()=> {
        //  form.reset()
        showSuccessModal()
  
    }).catch(err =>{
        showSuccessModal1()
        console.log(err)
    })
  }
  
  function showSuccessModal() {
    const myModalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
  }
  function showSuccessModal1() {
    const myModalEl = document.getElementById('successModal1');
    const modal = new bootstrap.Modal(myModalEl)
    modal.show()
  }