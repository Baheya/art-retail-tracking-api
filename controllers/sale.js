const Sale = require('../models/sale');
const Artwork = require('../models/artwork');
const { ErrorHandler } = require('../helpers/error');
const mongoose = require('mongoose');

exports.getSales = async (req, res, next) => {
  try {
    const sales = await Sale.aggregate([
      {
        $match: {
          artist: mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $project: {
          month: { $month: '$date' },
          year: { $year: '$date' },
          date: 1,
          artwork: 1,
          artist: 1,
          editionSold: 1,
        },
      },
      {
        $lookup: {
          from: Artwork.collection.name,
          localField: 'artwork',
          foreignField: '_id',
          as: 'artwork',
        },
      },
      {
        $unwind: '$artwork',
      },
      {
        $group: {
          _id: {
            year: '$year',
            month: '$month',
          },
          monthlySales: {
            $push: {
              artwork: '$artwork',
              date: '$date',
              editionSold: '$editionSold',
            },
          },
        },
      },
      {
        $group: {
          _id: {
            year: '$_id.year',
          },
          yearlySales: {
            $push: { month: '$_id.month', monthlySales: '$monthlySales' },
          },
        },
      },
    ]);
    res.status(200).json({
      message: 'Sale fetched successfully.',
      sales,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createSale = async (req, res, next) => {
  try {
    if (req.body.artwork.availablePrints < 0) {
      throw new ErrorHandler(
        400,
        'Please make sure you have enough available prints for the sale.'
      );
    }
    const sale = new Sale({
      date: req.body.date,
      artwork: req.body.artwork._id,
      artist: req.user._id,
      editionSold: req.body.editionSold,
    });
    await sale.save();
    res.status(201).json({
      message: 'Sale created successfully.',
      sale,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
