import axios from "axios";

const API_URL =
  "http://localhost:8080/api/v1/student";

class StudentService {

  getall() {
    return axios.get(API_URL);
  }

  getById(stno) {
    return axios.get(`${API_URL}/${stno}`);
  }

  create(student) {
    return axios.post(API_URL, student);
  }

  updateById(stno, student) {
    return axios.put(
      `${API_URL}/${stno}`,
      student
    );
  }

  deleteById(stno) {
    return axios.delete(
      `${API_URL}/${stno}`
    );
  }

}

export default new StudentService();