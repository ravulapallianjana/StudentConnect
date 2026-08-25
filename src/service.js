import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import StudentService from "./StudentService";


function Service() {

  const { stno } = useParams();

  const navigate = useNavigate();


  const [student, setStudent] =
    useState({
      stno: "",
      firstname: "",
      marks: ""
    });


  const [loading, setLoading] =
    useState(true);


  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]:
        e.target.value
    });

  };


  useEffect(() => {

    StudentService
      .getById(stno)

      .then((res) => {

        setStudent(res.data);

      })

      .catch((error) => {

        console.log(error);

        alert(
          "Unable to load student"
        );

      })

      .finally(() => {

        setLoading(false);

      });

  }, [stno]);


  const handleSubmit = (e) => {

    e.preventDefault();


    if (!student.firstname.trim()) {

      alert(
        "Please enter student name"
      );

      return;

    }


    if (
      student.marks === "" ||
      student.marks < 0 ||
      student.marks > 100
    ) {

      alert(
        "Marks should be between 0 and 100"
      );

      return;

    }


    StudentService
      .updateById(stno, {
        firstname:
          student.firstname,

        marks:
          Number(student.marks)
      })

      .then(() => {

        alert(
          "Student updated successfully!"
        );

        navigate("/contact");

      })

      .catch((error) => {

        console.log(error);

        alert(
          "Unable to update student"
        );

      });

  };


  if (loading) {

    return (
      <div className="loading">
        Loading student...
      </div>
    );

  }


  return (

    <div className="page">

      <div className="edit-container">

        <div className="form-card edit-card">

          <div className="form-heading">

            <div className="form-icon">
              ✏️
            </div>

            <div>

              <h2>
                Edit Student
              </h2>

              <p>
                Update student information
              </p>

            </div>

          </div>


          <form onSubmit={handleSubmit}>

            <label>
              Student ID
            </label>

            <input
              type="text"
              value={student.stno}
              disabled
            />


            <label>
              Student Name
            </label>

            <input
              type="text"
              name="firstname"
              value={
                student.firstname
              }
              onChange={handleChange}
            />


            <label>
              Marks
            </label>

            <input
              type="number"
              name="marks"
              min="0"
              max="100"
              value={
                student.marks
              }
              onChange={handleChange}
            />


            <div className="form-buttons">

              <button
                type="submit"
                className="primary-button"
              >
                💾 Update Student
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  navigate("/contact")
                }
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Service;