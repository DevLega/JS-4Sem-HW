const apiUrl = `http://localhost:3000/students`;

const studentsList = document.getElementById("students-list");
const getStudentsBtn = document.getElementById("get-students-btn");
const form = document.getElementById('add-student-form');

let isEditMode = false;
let editingId = null;

async function getStudents() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    
    const data = await response.json();
    renderStudents(data);
  } catch (err) {
    console.error(`Caused an error during the request: ${err}`);
  }
}

function renderStudents(students) {
  const markUp = students.map(el => `
    <tr>
      <td>${el.id}</td>
      <td>${el.name}</td>
      <td>${el.age}</td>
      <td>${el.course}</td>
      <td>${Array.isArray(el.skills) ? el.skills.join(", ") : el.skills}</td>
      <td>${el.email}</td>
      <td>${el.isEnrolled}</td>
      <td>
        <button data-edit-id="${el.id}">✏️</button>
        <button data-id="${el.id}">🗑️</button>
      </td>
    </tr>
  `).join("");
  studentsList.innerHTML = markUp;
}

async function addStudent(student) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
  } catch (err) {
    console.error(`Caused an error during the request: ${err}`);
  }
}

async function updateStudent(id, updatedData) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
  } catch (err) {
    console.error(`Caused an error during the request: ${err}`);
  }
}

async function deleteStudent(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
  } catch (err) {
    console.error(`Caused an error during the request: ${err}`);
  }
}

async function editStudent(editId) {
  try {
    const response = await fetch(`${apiUrl}/${editId}`);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    
    const student = await response.json();

    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("course").value = student.course;
    document.getElementById("skills").value = student.skills.join(", ");
    document.getElementById("email").value = student.email;
    document.getElementById("isEnrolled").checked = student.isEnrolled;

    isEditMode = true;
    editingId = editId;
  } catch (err) {
    console.error(`Caused an error during the request: ${err}`);
  }
}

getStudents();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);
  const course = document.getElementById("course").value;
  const skills = document.getElementById("skills").value
    .split(",")
    .map((s) => s.trim());
  const email = document.getElementById("email").value;
  const isEnrolled = document.getElementById("isEnrolled").checked;

  const studentData = { name, age, course, skills, email, isEnrolled };

  try {
    if (isEditMode && editingId) {
      await updateStudent(editingId, studentData);
      isEditMode = false;
      editingId = null;
    } else {
      await addStudent(studentData);
    }
    form.reset();
    await getStudents();
  } catch (err) {
    console.error(err);
  }
});

studentsList.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;
  const editId = e.target.dataset.editId;

  if (id) {
    await deleteStudent(id);
    await getStudents();
  }

  if (editId) {
    await editStudent(editId);
  }
});

getStudentsBtn.addEventListener("click", () => getStudents());
