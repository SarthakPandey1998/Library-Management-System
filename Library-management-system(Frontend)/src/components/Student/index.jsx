import axios from "axios";
import { useRef, useState } from "react";

const Student = () => {
  const initialValues = { name: "", class: "", photo: null, video: null };
  const [data, setData] = useState(initialValues);
  const [dataList, setDataList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("class",data.class);
    if(data.photo){
      formData.append("photo",data.photo);
    }
    if(data.video){
      formData.append("video",data.video);
    }
    
    axios.post("http://127.0.0.1:5000/student",formData)
    .then((res)=>console.log(res.data))
    .catch((err)=>console.log(err))



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
    reset();
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

  const reset = () => {
    setData(initialValues);
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };


  return (
    <div
      className="d-flex justify-content-center align-items-center  pt-3"
      style={{ width: "auto", height: "auto" }}
    >
      <div className="border border-dark border-2 w-auto bg-primary-subtle px-5 pt-2 pb-5">
        <h6 className="text-center mt-2">1. Student</h6>
        <form
          onSubmit={handleSubmit}
          className="border border-dark border-2 bg-secondary w-100 px-3 py-4"
          action="/student"
          method="post"
          encType="multipart/form-data"
        >
          <div className="d-flex justify-content-between my-2">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className="form-control w-75"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between my-2">
            <label htmlFor="class" className="form-label">
              Class:
            </label>
            <input
              type="text"
              name="class"
              className="form-control  w-75"
              value={data.class}
              onChange={(e) => setData({ ...data, class: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between my-2">
            <label className="form-label">Photo:</label>
            <input
              type="file"
              name="photo"
              className="form-control  w-75"
              accept="image/*"
              ref={photoInputRef}
              onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
            />
          </div>
          <div className="d-flex justify-content-between my-2">
            <label className="form-label">Video:</label>
            <input
              type="file"
              name="video"
              className="form-control  w-75"
              accept="video/*"
              ref={videoInputRef}
              onChange={(e) => setData({ ...data, video: e.target.files[0] })}
            />
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-warning  px-4">
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger px-3"
              onClick={() => {
                reset();
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
            <table className="table table-bordered  table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Photo</th>
                  <th>Video</th>
                </tr>
              </thead>
              <tbody>
                {dataList.length > 0 &&
                  dataList.map((item, index) => {
                    return (
                      <tr key={index} onClick={() => setSelectedIndex(index)}>
                        <td>{item.name}</td>
                        <td>{item.class}</td>
                        <td>
                          {item.photo ? (
                            <img
                              src={URL.createObjectURL(item.photo)}
                              width="150"
                              height="100"
                              alt="photo"
                            />
                          ) : (
                            "No file"
                          )}
                        </td>
                        <td>
                          {item.video ? (
                            <video width="150" height="100" controls>
                              <source
                                src={URL.createObjectURL(item.video)}
                                type={item.video.type}
                              ></source>
                            </video>
                          ) : (
                            "No file"
                          )}
                        </td>
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
export default Student;
