const readIdQueryParam = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params.id
}

function apiGetMarkDetails() {
    const id = readIdQueryParam()

    axios.get(`http://localhost:8080/mark/${id}`)
        .then(httpReponse => httpReponse.data)
        .then(data => populateTableDetails(data.bd))
        .catch(err => console.log(err))
}



function populateTableDetails({ id, name, marks, grade, feedback }) {
    // populating invoice details inside a table
    const grid = document.createElement('div');
    grid.classList.add('row', 'g-2');

    const card = document.createElement('div');
    card.classList.add('col-md-6', 'col-lg-4');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card', 'p-3');

    const header = document.createElement('h6');
    header.innerHTML = `student Id: ${id}`;

    const faculty = document.createElement('h5');
    faculty.innerHTML = `Student Name: ${name}`;

    const marksElement = document.createElement('p');
    marksElement.innerHTML = `Marks: ${marks}`;

    const gradeElement = document.createElement('p');
    gradeElement.innerHTML = `Grade: ${grade}`;

    const feedbackElement = document.createElement('p');
    feedbackElement.innerHTML = `Feedback: ${feedback}`;

    cardBody.appendChild(header);
    cardBody.appendChild(faculty);
    cardBody.appendChild(marksElement);
    cardBody.appendChild(gradeElement);
    cardBody.appendChild(feedbackElement);

    card.appendChild(cardBody);
    grid.appendChild(card);

    const table = document.getElementById('tableDetails');
    table.appendChild(grid);
}


apiGetMarkDetails()