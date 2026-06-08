const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const app = express();

app.use(cors());

const upload = multer();

app.post(
  "/detect",
  upload.single("image"),
  async (req, res) => {

    try {

      // send image to python

      const formData = new FormData();

      formData.append(
        "file",
        req.file.buffer,
        req.file.originalname
      );

      const response = await axios.post(
        "http://127.0.0.1:8000/recognize",
        formData,
        {
          headers: formData.getHeaders()
        }
      );

      console.log(response.data);

      res.json(response.data);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Server Error 😭"
      });
    }
  }
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});