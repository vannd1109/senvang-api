// const { upload } = require("../middleware/upload");

const upload = async (req, res) => {
  // req
  //   .save()
  //   .then((result) => {
  //     res.status(201).json({
  //       message: "User registered successfully!",
  //       userCreated: {
  //         _id: result._id,
  //         avatar: result.avatar,
  //       },
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err),
  //       res.status(500).json({
  //         error: err,
  //       });
  //   });
};

module.exports = {
  upload,
};
