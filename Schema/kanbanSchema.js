const { Schema, model } = require("mongoose");

const KanbanSchema = new Schema({
  products: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

KanbanSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Kanban = model("Kanban", KanbanSchema);

module.exports = Kanban;
