const User = require('../models/users');

module.exports = async (req, res) => {
  try {
    const { name, post } = req.body;
    const image = req.file ? req.file.filename : '';
    console.log(name,post,image)

    const data = {
      name,
      post,
      image,
    };

    await User.create(data);
    res.json({
      data: 'บันทึกข้อมูลเรียบร้อย'
    });
  } catch (error) {
    res.status(500).json({
      error: console.error(error)
    });
  }
};
