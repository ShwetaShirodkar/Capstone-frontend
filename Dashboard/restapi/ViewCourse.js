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
  grid.classList.add('grid')
  if (!Array.isArray(courses)) {
    courses = [courses]
  }
  for (const course of courses) {
    const { courseName, facultyName, material, recording, startDate, endDate } = course
    const card = document.createElement('div')
    card.classList.add('card')
    const header = document.createElement('h1')
    header.innerHTML = courseName
    const faculty = document.createElement('h4')
    faculty.innerHTML = `By: ${facultyName}`
    const dates = document.createElement('p')
    dates.innerHTML = `Schedule: ${startDate} to ${endDate}`
    const materialButton = document.createElement('button');
    materialButton.classList.add('browse-button');
    materialButton.innerHTML = 'Browse Material';
    materialButton.addEventListener('click', () => window.open(material, '_blank'));
    const recordingButton = document.createElement('button');
    recordingButton.classList.add('watch-now-button');
    recordingButton.innerHTML = 'View Recordings';
    recordingButton.addEventListener('click', () => window.open(recording, '_blank'));
    card.appendChild(header)
    card.appendChild(faculty)
    card.appendChild(dates)
    card.appendChild(materialButton)
    card.appendChild(recordingButton)
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