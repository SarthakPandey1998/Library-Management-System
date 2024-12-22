import axios from "axios";
import { useEffect, useState } from "react";

const Library = () => {
  const initialValues = {
    name:"",
    photo: null,
    video: null,
    author: "",
    startdate: "",
    enddate: "",
  };
  const [data, setData] = useState(initialValues);
  const [dataList, setDataList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [studentData, setStudentData] = useState([
    { name: "", class: "", photo: null, video: null },
  ]);
  const [bookData, setBookData] = useState([
    { name: "", author: "", publication: "", year: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      var updatedList = dataList.map((item, index) =>
        index === editIndex ? data : item
      );
      setDataList(updatedList);
      setEditIndex(null);
    } else {
      var updatedData = [...dataList, data];
      setDataList(updatedData);
    }
    setData(initialValues);
  };

  const handleEdit = () => {
    if (selectedIndex !== null) {
      setData(dataList[selectedIndex]);
      setEditIndex(selectedIndex);
    }
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedDataList = dataList.filter(
        (_, index) => index != selectedIndex
      );
      setDataList(updatedDataList);
      setSelectedIndex(null);
    }
  };

  const getStudentData = () => {
    axios
      .get("http://127.0.0.1:5000/student")
      .then((res) => {
        res.data.unshift({
          name: "Select Name",
          class: "select Class",
          photo: "select Photo",
          video: "Select video",
        });
        setStudentData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getBookData = () => {
    axios
      .get("http://127.0.0.1:5000/book")
      .then((res) => {
        res.data.unshift({
          name: "Select Bookname",
          author: "Select Authorname",
          publication: "",
          year: "",
        });
        setBookData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getStudentData();
    getBookData();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center mt-5 pt-3"
      style={{ width: "auto", height: "auto" }}
    >
      <div className="w-auto  px-5 pt-2 pb-5">
        <h6 className="text-center mt-2">3. Library</h6>
        <form
          onSubmit={handleSubmit}
          className="border border-dark bg-secondary border-2 w-100 px-3 py-4"
        >
          <div className="d-flex justify-content-between my-2">
            <label htmlFor="name" className="form-label">
              Student Name:
            </label>
            <select
              name="name"
              className="form-select w-50"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            >
              {studentData.map((student, index) => {
                return (
                  <option key={index} value={student.name}>
                    {student.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="d-flex justify-content-between  my-2">
            <label htmlFor="photo" className="form-label">
              Photo:
            </label>
            <select
              name="photo"
              className="form-select w-50"
              value={data.photo}
              onChange={(e) => setData({ ...data, photo: e.target.value })}
            >
              {studentData.map((student, index) => {
                return (
                  <option key={index} value={student.photo}>
                    {student.photo}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-flex justify-content-between my-2">
            <label htmlFor="video" className="form-label">
              Video:
            </label>
            <select
              name="video"
              className="form-select w-50"
              value={data.video}
              onChange={(e) => setData({ ...data, video: e.target.value })}
            >
              {studentData.map((student, index) => {
                return (
                  <option key={index} value={student.video}>
                    {student.video}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-flex justify-content-between my-2">
            <label htmlFor="class" className="form-label">
              Book Name:
            </label>
            <select
              name="author"
              className="form-select  w-50"
              value={data.author}
              onChange={(e) => setData({ ...data, author: e.target.value })}
            >
              {bookData.map((book, index) => {
                return (
                  <option key={index} value={book.name}>
                    {book.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="d-flex justify-content-between my-2">
            <label className="form-label">Start Date:</label>
            <input
              type="date"
              name="startdate"
              className="form-control  w-50"
              value={data.startdate}
              onChange={(e) => setData({ ...data, startdate: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between my-2">
            <label className="form-label">End Date:</label>
            <input
              type="date"
              name="enddate"
              className="form-control  w-50"
              value={data.enddate}
              onChange={(e) => setData({ ...data, enddate: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-success px-4">
              Save
            </button>
            <button
              type="button"
              className="btn btn-warning px-3"
              onClick={() => {
                setData(initialValues);
                setEditIndex(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-5">
          <h6>Grid</h6>
          <div className="d-flex gap-2">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {dataList.length > 0 &&
                  dataList.map((item, index) => {
                    return (
                      <tr key={index} onClick={() => setSelectedIndex(index)}>
                        <td>{item.name}</td>
                        <td>
                          <img
                            src={`http://127.0.0.1:5000/${item.photo}`}
                            alt="Student"
                            style={{
                              width: "150px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>
                          <video width="150" height="100" controls>
                            <source
                              src={`http://127.0.0.1:5000/${item.video}`}
                              type="video/mp4"
                            />
                          </video>
                        </td>
                        <td>{item.author}</td>
                        <td>{item.startdate}</td>
                        <td>{item.enddate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div>
              {selectedIndex !== null && (
                <div className="d-flex">
                  <button onClick={handleEdit}>Edit</button>
                  <button className="ms-2" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Library;
