const Consumer = require("../Schema/ConsumerSchema");

exports.add = async (req, res, next) => {
  const { Name, Status, Week, Butget, Location, product } = req.body;
  
  const consumer = new Consumer({
    Name,
    Status,
    Week,
    Butget,
    Location,
    product,
  });

  try {
    const savedConsumer = await consumer.save();
    res.json(savedConsumer)
  } catch (error) {
    next(error);
  }
};

exports.show = (req, res, next) => {

  Consumer.find({})
    .populate('products')
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};

exports.showById = (req, res, next) => {
  const id = req.params.id;

  Consumer.findById(id)
    .populate("products")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};
