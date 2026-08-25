
import React from "react";

function Student(props) {

  let grade;

  if (props.marks >= 90 && props.marks <= 100) {
    grade = "A";
  } else if (props.marks >= 75 && props.marks <= 89) {
    grade = "B";
  } else if (props.marks >= 60 && props.marks <= 74) {
    grade = "C";
  } else if (props.marks >= 35 && props.marks <= 59) {
    grade = "D";
  } else {
    grade = "Fail";
  }

  return (
    <div>
      <h2>Student Details</h2>

      <p>Name: {props.name}</p>
      <p>Roll No: {props.rollNo}</p>
      <p>Age: {props.age}</p>
      <p>Marks:{props.marks}</p>
      <p>Grade: {grade}</p>
    </div>
  );
}

export default Student;