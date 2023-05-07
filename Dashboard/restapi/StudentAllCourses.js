function setUpTable() {
  const table = document.getElementById('tableCourse')
  apiFetchAllCourses(table)
}

setUpTable()

function populateActualData(table, courses) {
  const grid = document.createElement('div')
  grid.classList.add('grid')
  for (const course of courses) {
    const { courseId, courseName, facultyName, startDate, endDate } = course
    const card = document.createElement('div')
    card.classList.add('card')
    const header = document.createElement('h2')
    header.innerHTML = courseName
    const faculty = document.createElement('p')
    faculty.innerHTML = `Faculty: ${facultyName}`
    const dates = document.createElement('p')
    dates.innerHTML = `Schedule:${startDate} to ${endDate}`
    const updateButton = document.createElement('button')
    updateButton.innerHTML = 'Get Started'
    updateButton.classList.add('btn', 'btn-success')
    updateButton.setAttribute('data-id', courseId)
    updateButton.addEventListener('click', (event) => {
      const courseId = event.target.getAttribute('data-id')
      window.location.href = `./ViewCourse.html?id=${courseId}`
    })
    card.appendChild(header)
    card.appendChild(faculty)
    card.appendChild(dates)
    card.appendChild(updateButton)
    grid.appendChild(card)
  }
  table.appendChild(grid)
}


function apiFetchAllCourses(table) {
  axios.get('http://localhost:8080/courses/list')
      .then(res => {
          const { data } = res
          console.log(data)
          const { sts, msg, bd } = data
          populateActualData(table, bd)
      })
      .catch(err => console.log(err))
}
