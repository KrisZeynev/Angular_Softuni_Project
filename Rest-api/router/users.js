const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');
const User = require('../models/userModel');

router.get('/profile', auth(),authController.getProfileInfo);
router.put('/profile', auth(),authController.editProfileInfo);

// get user by id
router.get('/id/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router