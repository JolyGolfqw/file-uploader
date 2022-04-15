const Image = require("../models/Image.model");

module.exports.imageController = {
  addPhoto: async (req, res) => {
    try {
      const data = await Image.create({
        image: req.file.path,
      });

      res.json(data);
    } catch (err) {
      res.json({ error: err.message });
    }
  },

  getImages: async (req, res) => {
    try {
      const data = await Image.find();
      res.json(data);
    } catch (err) {
      res.json({ error: err.message });
    }
  },
};
