import React, { useState, useEffect } from "react";
import "./threads.css";
import axios from "axios";

function Threads() {
  const [data, setData] = useState([]);

  // Toggle by ID
  const [islike, setIslike] = useState({});
  const [ismessage, setIsmessage] = useState({});

  // Swap sort
  const [islatest, setIslatest] = useState(false);
  const [isaz, setIsaz] = useState(false);

  // Comments
  const [message, setMessage] = useState("");

  const [storageMessage, setStorageMessage] = useState([]);

  const [get, setGet] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const formatLocalTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString("th-TH");
  };

  useEffect(() => {
    fetchData();
  }, []);

  // sort
  const sortDataByTime = () => {
    const sortedData = [...data].sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    setData(sortedData);
    setIslatest((prev) => !prev);
  };

  const sortDataByAZ = () => {
    const sortedData = [...data].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    setData(sortedData);
    setIsaz((prev) => !prev);
  };

  // Toggle
  const handleClickLike = (id) => {
    setIslike((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id] || false,
    }));
  };

  const handleClickMessage = (id) => {
    setIsmessage((prevMessage) => ({
      ...prevMessage,
      [id]: !prevMessage[id] || false,
    }));
  };

  const messageInput = (id, value) => {
    setMessage((prevInput) => ({ ...prevInput, [id]: value }));
    console.log(message);
  };

  const saveTask = (e) => {
    e.preventDefault();
    setGet(message);
    setMessage("");
    // const transformedData = Object.keys(message).map((key) => {
    //   return { id: key, title: message[key] };
    // });
    // console.log(transformedData)
    // setStorageMessage(transformedData)
    // setMessage("");
  };
  useEffect(() => {
    console.log(get);
  }, [get]);

  return (
    <div className="threads">
      <div>
        <div className="timeCont">
          <div></div>
          <div>
            {islatest}
            <button className="sortTime " onClick={sortDataByTime}>
              ล่าสุด
            </button>

            <button className="sortTime" onClick={sortDataByAZ}>
              A-Z
            </button>
          </div>
        </div>
        {data.map((item) => (
          <div key={item._id} className="headtheads">
            <img
              className="iconthreads"
              src={`http://localhost:8080/uploads/${item.image}`}
              alt="logo"
            />
            <div className="post">
              <h1 className="name">{item.name}</h1>
              <p className="comment">{item.post}</p>
              <div className="likesfoot">
                {islike[item._id] ? (
                  <p className="likes">1 Likes</p>
                ) : (
                  <p className="likes">0 Likes</p>
                )}
                <p className="times">{formatLocalTime(item.updatedAt)}</p>
              </div>

              <div className="icons">
                <p onClick={() => handleClickLike(item._id)}>
                  {islike[item._id] ? (
                    <i
                      style={{ color: "red" }}
                      className="bi bi-heart-fill"
                    ></i>
                  ) : (
                    <i className="bi bi-heart"></i>
                  )}
                </p>

                <p onClick={() => handleClickMessage(item._id)}>
                  <i className="bi bi-chat"></i>
                </p>

                <p>
                  <i className="bi bi-arrow-repeat"></i>
                </p>
                <p>
                  <i className="bi bi-send-fill"></i>
                </p>
              </div>

              {ismessage[item._id] ? (
                <div className="commentsinput">
                  {get[item._id] ? (
                    <div  className="containerCom">
                      <img
                        className="iCom"
                        src="https://img.freepik.com/free-vector/modern-anonymous-concept-with-flat-design_23-2147887332.jpg?w=996&t=st=1689855784~exp=1689856384~hmac=051424a9fa5cc2297e33372694e10aa6c8caf90529fda925e2cf20205d700ce5"
                        alt=""
                      />
                      <div>
                        <h2 className="nCom">Anonimousse</h2>
                        <p className="get">{get[item._id]}</p>
                      </div>
                    </div>
                  ) : null}
                  <form
                    style={{
                      display: "flex",
                      width: "100%",
                      marginTop: "-12px",
                    }}
                  >
                    <input
                      value={message[item._id] || ""}
                      onChange={(e) => messageInput(item._id, e.target.value)}
                      placeholder="แสดงความคิดเห็น"
                      style={{ fontSize: "15px", width: "78%", height: "50px" }}
                      className="form-control"
                    />
                    <button
                      onClick={saveTask}
                      style={{
                        fontSize: "18px",
                        width: "20%",
                        height: "50px",
                        marginBottom: "12px",
                        marginTop: "-0px",
                      }}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Threads;
