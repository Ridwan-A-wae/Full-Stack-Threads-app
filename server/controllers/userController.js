const User = require('../models/users');

module.exports = async (req, res) => {
    try {
        const users = await User.find({}); // ดึงข้อมูลทั้งหมดจาก Collection users

        res.json(users); // ส่งข้อมูลกลับไปในรูปแบบ JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้' });
    }
};
