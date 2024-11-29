import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("");

  const API_URL = "https://jsonplaceholder.typicode.com/users";

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Add a new student
  const addStudent = async (e) => {
    e.preventDefault();
    const newStudent = {
      name: studentName,
      grade: studentGrade,
    };

    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newStudent);
      setStudents([...students, { id: response.data.id, ...newStudent }]);
      setStudentName("");
      setStudentGrade("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Delete a student
  const deleteStudent = async (id) => {
    try {
      await axios.delete(https://jsonplaceholder.typicode.com/posts/${id});
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management System</h1>

      {/* Add Student Form */}
      <form onSubmit={addStudent} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Student Grade"
          value={studentGrade}
          onChange={(e) => setStudentGrade(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {/* Display Student List */}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.grade}
            <button onClick={() => deleteStudent(student.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;