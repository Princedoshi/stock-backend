//wishlist.controller.js//

const Wishlist = require('../models/wishlist.model');

exports.helloWorld = (req, res) => {
  res.send('Hello World from wishlist controller!');
};

exports.createOrUpdateWishlist = async (req, res) => {
  try {
    const { userId, stockSymbol, latestTimeSeriesData } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, stocks: [{ stockSymbol, latestTimeSeriesData }] });
    } else {
      const stockIndex = wishlist.stocks.findIndex((stock) => stock.stockSymbol === stockSymbol);

      if (stockIndex === -1) {
        wishlist.stocks.push({ stockSymbol, latestTimeSeriesData });
      } else {
        wishlist.stocks[stockIndex].latestTimeSeriesData = latestTimeSeriesData;
      }
    }

    const savedWishlist = await wishlist.save();
    res.status(200).json(savedWishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.params.userId;
    const wishlist = await Wishlist.findOne({ userId }).populate('userId');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};