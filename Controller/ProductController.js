const Product = require("../Schema/ProductSchema");
const Kanban = require("../Schema/KanbanSchema");
const Consumer = require("../Schema/ConsumerSchema");

exports.add = async (req, res, next) => {
  const { Name, Status, Image, consumers, Location, totalAmount } = req.body;

  try {
    const kanban = new Kanban();

    const newKanban = await kanban.save();

    const product = new Product({
      Name,
      Status,
      Image,
      consumers,
      Location,
      totalAmount,
      kanbans: newKanban._id,
    });

    

    const productSaved = await product.save();
    newKanban.products = productSaved._id
    
    await newKanban.save()

    const consumer = await Consumer.findById(consumers);

    consumer.products.push(productSaved._id);

    consumer.save();

    res.json(productSaved);
  } catch (error) {
    next(error);
  }
};

exports.show = (req, res, next) => {
  Product.find({})
    .populate("kanbans")
    .populate("consumers")
    .then((response) => {
        // response.forEach(element => {
        //      Consumer.findById(element.consumers).then((response) => {
        //         element.consumers = response.Name
        //       })
        // });
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};

exports.showById = (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
    .populate("kanbans")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};
