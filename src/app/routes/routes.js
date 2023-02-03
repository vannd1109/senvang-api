const express = require("express");
const SliderModel = require("../models/slider");
const BannerModel = require("../models/banner");
const UserModel = require("../models/user");
const router = express.Router();

// Add New Slider
router.post("/add-slider", async (req, res) => {
  const data = new SliderModel({
    image: req.body.image,
    url: req.body.url,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Sliders
router.get("/sliders", async (req, res) => {
  try {
    const data = await SliderModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Slider
router.get("/getSingleSlider/:id", async (req, res) => {
  try {
    const data = await SliderModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Slider
router.patch("/update-slider/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await SliderModel.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Slider
router.delete("/delete-slider/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const data = await SliderModel.findByIdAndDelete(id)
        res.send(`Document with ${data.image} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});


// Add New Banner
router.post("/add-banner", async (req, res) => {
    const banners = new BannerModel({
      image: req.body.image,
      url: req.body.url,
    });
  
    try {
      const data = await banners.save();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Get all Banner
  router.get("/banners", async (req, res) => {
    try {
      const data = await BannerModel.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //Get by ID Banner
  router.get("/getSingleBanner/:id", async (req, res) => {
    try {
      const data = await BannerModel.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //Update by ID Banner
  router.patch("/update-banner/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const result = await BannerModel.findByIdAndUpdate(id, updatedData, options);
  
      res.send(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Delete by ID Banner
  router.delete("/delete-banner/:id", async(req, res) => {
      try {
          const id = req.params.id;
          const data = await BannerModel.findByIdAndDelete(id)
          res.send(`Document with ${data.image} has been deleted..`)
      }
      catch (error) {
          res.status(400).json({ message: error.message })
      }
  });

  // Add New User
router.post("/add-user", async (req, res) => {
    const user = new UserModel({
      id: req.body.id,
      username: req.body.username,
      password: req.body.password,
      type: req.body.type,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      birthday: req.body.birthday,
      avatar: req.body.avatar
    });
  
    try {
      const data = await user.save();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Get all User
  router.get("/users", async (req, res) => {
    try {
      const data = await UserModel.find();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //Get by ID User
  router.get("/getSingleUser/:id", async (req, res) => {
    try {
      const data = await UserModel.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  //Update by ID User
  router.patch("/update-user/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const result = await UserModel.findByIdAndUpdate(id, updatedData, options);
  
      res.send(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Delete by ID User
  router.delete("/delete-user/:id", async(req, res) => {
      try {
          const id = req.params.id;
          const data = await UserModel.findByIdAndDelete(id)
          res.send(`Document with ${data.username} has been deleted..`)
      }
      catch (error) {
          res.status(400).json({ message: error.message })
      }
  });

module.exports = router;
