///wishlist-routes.js//

const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist.controller');

// Hello World route
router.get('/hello', (req, res) => {
  res.send('Hello World from wishlist routes!');
});

router.post('/wishlist', wishlistController.createOrUpdateWishlist);

router.get('/wishlist/:userId', wishlistController.getWishlist);

module.exports = router;