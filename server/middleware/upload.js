// โค้ดสำหรับ multer middleware และการกำหนดตำแหน่งที่จะบันทึกไฟล์ภาพ
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg');
  }
});

const upload = multer({
  storage: storage
});

module.exports = upload;
