// Variables
const url = 'http://studenter.miun.se/~mohj1800/web3/mom5/rest.php/api';
var add = document.getElementById('add');

// Eventlisteners
window.onload = getCourses;
add.addEventListener('click', addCourse);

//Function to get courses from REST
function getCourses() {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {

        //Varable for table
        let output = '<tr><th>Kurskod</th><th>Kursnamn</th><th>Kursnivå</th><th>Kursplan</th></tr>';

        //Loop trough courses
        data.forEach(course => {
            output +=`
                <tr>
                    <td>${course.code}</td>
                    <td>${course.name}</td>
                    <td>${course.level}</td>
                    <td><a href="${course.syllabus}" target="_blank">Länk</a></td>
                </tr>
            `;
        })
    document.getElementById('course_table').innerHTML = output;
    })
    // Catch error if exists and writes to console
    .catch((err) => console.log(err))
}

// Function to add course
function addCourse(e) {
    e.preventDefault();

    // Data from form to JSON
    let formData = JSON.stringify({
        code: document.getElementById('code').value,
        name: document.getElementById('name').value,
        level: document.getElementById('level').value,
        syllabus: document.getElementById('syllabus').value
    });
    
    // Send JSON to REST webservice
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    })
    .then((res) => res.json())
    .then((data) => { // Write status message
        let mess = `<p class="message">${data.message}</p>`;

    document.getElementById('mess').innerHTML = mess;
    })
    .catch((err) => console.log(err)) // Catch error if exists and writes to console

    // Clear form
    document.querySelector('form').reset();
}