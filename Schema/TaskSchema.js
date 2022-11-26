const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  Title: String,
  Status: String,
  Summary: String,
  Type: String,
  Priority: String,
  finalDate: Date,
  startDate: Date,
  kanbans: {
    type: Schema.Types.ObjectId,
    ref: "Kanban",
  },
  workings: {
    type: Schema.Types.ObjectId,
    ref: "Working",
  },
});

TaskSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.Id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Task = model("Task", TaskSchema);

module.exports = Task;
