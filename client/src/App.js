import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import logo from "./upload.png";
import { loadImage, uploadImage } from "./redux/features/images";
import CircularProgress from "@mui/material/CircularProgress";

const App = () => {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadImage());
  }, [dispatch]);

  const images = useSelector((state) => state.images);
  const loader = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  console.log(images);

  const sendFile = () => {
    dispatch(uploadImage(image));
  };

  if (loader) {
    return (
      <div className={"loader"}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className={"error"}>{error}</div>;
  }

  return (
    <div className="App">
      <div className="avatar">
        {!images.length && <img src={logo} alt="empty" />}
        {images.map((item, index) => {
          return (
            <img
              key={index}
              className="logo"
              src={item.image}
              alt="сурт"
              style={{ width: 500 }}
            />
          );
        })}
      </div>
      <div
        className="mb-3"
        style={{ display: "flex", width: 800, margin: "auto" }}
      >
        <input
          onChange={(e) => setImage(e.target.files[0])}
          className="form-control"
          type="file"
          id="formFile"
          style={{
            width: 600,
            margin: "auto",
          }}
        />
        <button
          onClick={sendFile}
          type="button"
          className="btn btn-outline-primary"
          style={{ width: 200 }}
        >
          Загрузка
        </button>
      </div>
    </div>
  );
};

export default App;
