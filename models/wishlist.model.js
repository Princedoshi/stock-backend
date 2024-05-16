///wishlist.model.js//

const mongoose = require('mongoose');

exports.helloWorld = (req, res) => {
  res.send('Hello World from wishlist model!');
};

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  stocks: [
    {
      stockSymbol: { type: String, required: true },
      latestTimeSeriesData: { type: Object, required: true },
    },
  ],
}, { timestamps: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;