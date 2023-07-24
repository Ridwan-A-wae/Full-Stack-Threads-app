import React, { useState } from "react";
import "./replies.css";
import Swal from "sweetalert2";
import axios from "axios";

function Replies() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [preview, setPreview] = useState(null);


  const fileChange = (e) => {
    if (e && e.target) {
      const file = e.target.files[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        setImage(file)
      } else {
        setImage("");
      }
    }
  };
  console.log(image)
  const clearValue = (e) => {
    e.preventDefault();
    {
      setImage(null);
      setName("");
      setPost("");
      setPreview(null)
    }
  };

  // บันทึกข้อมูล
  const sentData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("post", post);
      formData.append("image", image);

      await axios.post("http://localhost:8080/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setPost("");
      setImage(null);
      setPreview(null)
      Swal.fire("บันทึกข้อมูลเรียบร้อย");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="threads">
      <form>
        <div className="createcontainer">
          <div className="upload">
            <p className="Profile">Profile</p>
            <input
              type="file"
              onChange={fileChange }
              accept="image/jpeg"
              style={{
                borderRadius: "30px",
                padding: "1rem",
                backgroundColor: "white",
                color: "black",
                fontSize: "18px",
              }}
            />
          </div>
          {preview && (
            <img
              style={{
                objectFit: "contain",
                width: "200px",
                height: "200px",
                marginBottom: "-2rem",
              }}
              src={preview}
              alt="previewImage"
            />
          )}
          <div className="post">
            <p className="Profile">Your name</p>
            <input
              placeholder="กรอกชื่อของคุณ"
              onChange={(e) => setName(e.target.value)}
              value={name}
              style={{ fontSize: "18px", color: "#1e1e1e" }}
              className="form-control"
              type="text"
            />
            <div>
              <p className="Profile">Post</p>
              <textarea
                onChange={(e) => setPost(e.target.value)}
                value={post}
                style={{ fontSize: "16px", height: "180px", color: "#1e1e1e" }}
                className="form-control"
                placeholder="คุณกำลังคิดอะไรอยู่"
                name=""
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="conbtn">
          <button
            onClick={sentData}
            type="button"
            style={{ width: "69%" }}
            className="btn btn-primary"
          >
            Submit
          </button>

          <button
            onClick={clearValue}
            style={{ width: "30%" }}
            className="btn btn-danger"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default Replies;
