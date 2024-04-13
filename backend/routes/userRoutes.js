const express = require('express')
const { registerUser, loginUser, allUsers, updateUser } =  require('../controllers/userControllers')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.route("/").get(protect, allUsers)
router.post("/", registerUser)
router.post("/login", loginUser)
router.put("/", protect, updateUser)

module.exports = router;
