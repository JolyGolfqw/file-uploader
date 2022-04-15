const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.resolve(__dirname, "images")));
app.use(require("./routes/upload.route"));

const connected = async () => {
  try {
    await mongoose.connect('mongodb+srv://overlord:Edb22edb22@cluster0.e2awg.mongodb.net/multer');
    console.log("Вы успешно подключились к MongoDB!");
    app.listen(port, () => {
      console.log("Server has been started!");
    });
  } catch (e) {
    console.log(e);
  }
};

connected();