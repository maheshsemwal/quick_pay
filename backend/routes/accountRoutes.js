const express = require('express')
const protect = require('../middleware/authMiddleware')
const { getBalance, transferFunds } = require('../controllers/accountController')
const router = express.Router()

router.route('/balance').get(protect, getBalance)
router.route('/transfer').post(protect, transferFunds)


module.exports = router