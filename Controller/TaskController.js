const Kanban = require("../Schema/KanbanSchema");
const Working = require("../Schema/WorkingSchema");
const Task = require("../Schema/TaskSchema");

exports.add = async (req, res, next) => {
  const {
    Title,
    Status,
    Summary,
    workings,
    Type,
    Priority,
    finalDate,
    startDate,
  } = req.body;

  try {
    const newWorking = await Working.findById(workings).populate("products");
    console.log(newWorking);
    const task = new Task({
      Title,
      Status,
      Summary,
      workings,
      kanbans: newWorking.products.kanbans,
      Type,
      Priority,
      startDate,
      finalDate,
    });

    const TaskSaved = await task.save();

    const kanban = await Kanban.findById(newWorking.products.kanbans._id);
    console.log(kanban);

    kanban.tasks.push(TaskSaved._id);

    kanban.save();

    newWorking.tasks.push(TaskSaved._id);

    newWorking.save();

    res.json(TaskSaved);
  } catch (error) {
    next(error);
  }
};

exports.show = (req, res, next) => {
  Task.find({})
    .populate("kanbans")
    //.populate("workings")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};

exports.showById = (req, res, next) => {
  const id = req.params.id;

  Task.findById(id)
    .populate("kanbans")
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      next(error);
    });
};
exports.updateById = (req, res, next) => {
  const id = req.params.id;
  const newTaskInfo = req.body;

  Task.findByIdAndUpdate(id, newTaskInfo)
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((error) => next(error));
};
