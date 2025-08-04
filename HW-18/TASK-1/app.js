const apiUrl = `http://localhost:3000/students`;

const studentsList = document.getElementById("students-list");
const getStudentsBtn = document.getElementById("get-students-btn");
const form = document.getElementById('add-student-form');

let isEditMode = false;
let editingId = null;

function getStudents() {
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(renderStudents);
}

function renderStudents(students) {
  const markUp = students
    .map(
      (el) => `
        <tr>
            <td>${el.id}</td>
            <td>${el.name}</td>
            <td>${el.age}</td>
            <td>${el.course}</td>
            <td>${el.skills}</td>
            <td>${el.email}</td>
            <td>${el.isEnrolled}</td>
            <td>
              <button data-edit-id="${el.id}">✏️</button>
              <button data-id="${el.id}">🗑️</button>
            </td>
        </tr>
        `
    )
    .join("");
  studentsList.innerHTML = markUp;
}

function addStudent(e) {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e),
  });
}

function updateStudent(id, updatedData) {
  return fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
}

function deleteStudent(id) {
  const url = `${apiUrl}/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

getStudents();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);
  const course = document.getElementById("course").value;
  const skills = document
    .getElementById("skills")
    .value.split(",")
    .map((s) => s.trim());
  const email = document.getElementById("email").value;
  const isEnrolled = document.getElementById("isEnrolled").checked;

  const studentData = {
    name,
    age,
    course,
    skills,
    email,
    isEnrolled,
  };

  if (isEditMode && editingId) {
    updateStudent(editingId, studentData).then(() => {
      isEditMode = false;
      editingId = null;
      form.reset();
      getStudents();
    });
  } else {
    addStudent(studentData).then(() => {
      form.reset();
      getStudents();
    });
  }
});

studentsList.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  const editId = e.target.dataset.editId;

  if (id) {
    deleteStudent(id).then(getStudents);
  }

  if (editId) {
    fetch(`${apiUrl}/${editId}`)
      .then((res) => res.json())
      .then((student) => {
        document.getElementById("name").value = student.name;
        document.getElementById("age").value = student.age;
        document.getElementById("course").value = student.course;
        document.getElementById("skills").value = student.skills.join(", ");
        document.getElementById("email").value = student.email;
        document.getElementById("isEnrolled").checked = student.isEnrolled;

        isEditMode = true;
        editingId = editId;
      });
  }
});

getStudentsBtn.addEventListener("click", () => getStudents());
