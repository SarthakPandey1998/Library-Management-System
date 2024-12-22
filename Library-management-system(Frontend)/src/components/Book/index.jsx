import axios from "axios";
import { useState } from "react";

const Book = () => {
  const initialValues = { name: "", author: "", publication: "", year: "" };
  const [data, setData] = useState(initialValues);
  const [dataList, setDataList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:5000/book",data)
    .then((res)=>console.log(res.data))
    .then((err)=>console.log(err)
    )
    
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


  return (
    <div
      className="d-flex justify-content-center align-items-center pt-3"
      style={{ width: "auto", height: "auto" }}
    >
      <div className="border border-dark border-2 bg-success-subtle w-auto px-5 pt-2 pb-5">
        <h6 className="text-center mt-2">2. Book</h6>
        <form
          onSubmit={handleSubmit}
          className="border border-dark bg-info border-2 bg w-100 px-3 py-4"
        >
          <div className="d-flex justify-content-between my-2">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="form-control w-50"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between my-2">
            <label htmlFor="class" className="form-label">
              Author:
            </label>
            <input
              type="text"
              name="author"
              className="form-control  w-50"
              value={data.author}
              onChange={(e) => setData({ ...data, author: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between my-2">
            <label className="form-label">Publication:</label>
            <input
              type="text"
              name="publication"
              className="form-control  w-50"
              value={data.publication}
              onChange={(e) => setData({ ...data, publication: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between my-2">
            <label className="form-label">Year:</label>
            <input
              type="date"
              name="year"
              className="form-control  w-50"
              value={data.year}
              onChange={(e) => setData({ ...data, year: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className=" btn btn-warning px-4">
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger px-3"
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
                  <th>Publication</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {dataList.length > 0 &&
                  dataList.map((item, index) => {
                    return (
                      <tr key={index} onClick={() => setSelectedIndex(index)}>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>{item.publication}</td>
                        <td>{item.year}</td>
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
export default Book;
