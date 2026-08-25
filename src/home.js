import { useState } from "react";
import StudentService from "./StudentService";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    firstname: "",
    marks: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };

  const saveStudent = (e) => {

    e.preventDefault();

    if (!student.firstname.trim()) {
      alert("Please enter student name");
      return;
    }

    if (
      student.marks === "" ||
      student.marks < 0 ||
      student.marks > 100
    ) {
      alert("Marks should be between 0 and 100");
      return;
    }

    setLoading(true);

    StudentService.create({
      firstname: student.firstname,
      marks: Number(student.marks)
    })
      .then(() => {

        alert("Student added successfully!");

        setStudent({
          firstname: "",
          marks: ""
        });

        navigate("/contact");

      })
      .catch((error) => {

        console.log(error);
        alert("Unable to add student");

      })
      .finally(() => {

        setLoading(false);

      });

  };

  return (

    <div className="page">

      <div className="hero">

        <div>

          <h1>
            Student Management Dashboard 👋
          </h1>

          <p>
            Add, manage and track student performance
            easily.
          </p>

        </div>

        <div className="hero-icon">
          🎓
        </div>

      </div>


      <div className="form-wrapper">

        <div className="form-card">

          <div className="form-heading">

            <div className="form-icon">
              ➕
            </div>

            <div>

              <h2>Add New Student</h2>

              <p>
                Enter student information below
              </p>

            </div>

          </div>


          <form onSubmit={saveStudent}>

            <label>
              Student Name
            </label>

            <div className="input-wrapper">

              <span>👤</span>

              <input
                type="text"
                name="firstname"
                value={student.firstname}
                onChange={handleChange}
                placeholder="Enter student name"
              />

            </div>


            <label>
              Marks
            </label>

            <div className="input-wrapper">

              <span>📊</span>

              <input
                type="number"
                name="marks"
                value={student.marks}
                onChange={handleChange}
                placeholder="Enter marks"
                min="0"
                max="100"
              />

            </div>


            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Adding Student..."
                : "➕ Add Student"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Home;