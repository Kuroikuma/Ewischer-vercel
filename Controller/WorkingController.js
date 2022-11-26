const Working = require("../Schema/WorkingSchema");

exports.add = async (req, res, next) => {
  const { Name, Status, Image, Designation, Country, HireDate, reportsTo, products, password, email } = req.body;

  try {
    const working = new Working({
        Name,
        Status,
        Designation,
        Image,
        Country,
        HireDate,
        reportsTo,
        products,
        password,
        email,
      });

    const newWorking = await working.save();

    res.json(newWorking);
  } catch (error) {
    next(error);
  }
};

exports.show = (req, res, next) => {
  Working.find({})
    .populate("products")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};

exports.showWorkingTask = (req, res, next) => {
    const id = req.params.id;

    Working.findById(id)
      .populate("tasks")
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        next(error);
      });
  };

  exports.login = (req, res, next) => {
    const { password, email } = req.body;

    Working.find({ password, email })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        next(error);
      });
  };

exports.showById = (req, res, next) => {
  const id = req.params.id;

  Working.findById(id)
    .populate("products")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};
