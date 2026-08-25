import { useEffect, useState } from "react";
import StudentService from "./StudentService";
import { useNavigate } from "react-router-dom";

function Contact() {

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();


  useEffect(() => {

    loadData();

  }, []);


  const loadData = () => {

    StudentService.getall()

      .then((res) => {

        console.log(
          "Students from backend:",
          res.data
        );

        setStudents(res.data);

      })

      .catch((error) => {

        console.log(
          "Error:",
          error
        );

      });

  };


  const deleteStudent = (stno) => {

    if (
      window.confirm(
        "Are you sure you want to delete this student?"
      )
    ) {

      StudentService.deleteById(stno)

        .then(() => {

          alert(
            "Student deleted successfully!"
          );

          loadData();

        })

        .catch((error) => {

          console.log(
            "Delete error:",
            error
          );

        });

    }

  };


  const filteredStudents =
    students.filter((student) =>
      student.firstname
        .toLowerCase()
        .includes(search.toLowerCase())
    );


  const averageMarks =
    students.length > 0
      ? (
          students.reduce(
            (sum, student) =>
              sum + Number(student.marks),
            0
          ) / students.length
        ).toFixed(1)
      : 0;


  const highestMarks =
    students.length > 0
      ? Math.max(
          ...students.map(
            (student) =>
              Number(student.marks)
          )
        )
      : 0;


  return (

    <div className="page">

      <div className="dashboard-header">

        <div>

          <h1>
            Student Dashboard
          </h1>

          <p>
            Manage all student records
            and performance
          </p>

        </div>

        <button
          className="add-button"
          onClick={() => navigate("/")}
        >
          ➕ Add Student
        </button>

      </div>


      {/* STAT CARDS */}

      <div className="stats">

        <div className="stat-card">

          <div className="stat-icon blue">
            👨‍🎓
          </div>

          <div>

            <span>Total Students</span>

            <h2>
              {students.length}
            </h2>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon green">
            📈
          </div>

          <div>

            <span>Average Marks</span>

            <h2>
              {averageMarks}
            </h2>

          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon orange">
            🏆
          </div>

          <div>

            <span>Highest Marks</span>

            <h2>
              {highestMarks}
            </h2>

          </div>

        </div>

      </div>


      {/* STUDENT TABLE */}

      <div className="table-card">

        <div className="table-header">

          <div>

            <h2>
              Student Records
            </h2>

            <p>
              View and manage all students
            </p>

          </div>


          <div className="search-box">

            🔍

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>ID</th>

                <th>STUDENT</th>

                <th>MARKS</th>

                <th>PERFORMANCE</th>

                <th>ACTIONS</th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="no-data"
                  >

                    📭 No students found

                  </td>

                </tr>

              ) : (

                filteredStudents.map(
                  (student) => (

                    <tr
                      key={student.stno}
                    >

                      <td>

                        <span className="id">
                          #{student.stno}
                        </span>

                      </td>


                      <td>

                        <div className="student">

                          <div className="avatar">

                            {student.firstname
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <span>
                            {student.firstname}
                          </span>

                        </div>

                      </td>


                      <td>

                        <strong>
                          {student.marks}
                        </strong>

                        <span>
                          /100
                        </span>

                      </td>


                      <td>

                        {student.marks >= 75 ? (

                          <span className="badge excellent">
                            Excellent
                          </span>

                        ) : student.marks >= 40 ? (

                          <span className="badge pass">
                            Pass
                          </span>

                        ) : (

                          <span className="badge fail">
                            Fail
                          </span>

                        )}

                      </td>


                      <td>

                        <button
                          className="action edit"
                          onClick={() =>
                            navigate(
                              `/edit/${student.stno}`
                            )
                          }
                        >
                          ✏️
                        </button>


                        <button
                          className="action delete"
                          onClick={() =>
                            deleteStudent(
                              student.stno
                            )
                          }
                        >
                          🗑️
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Contact;