const { Schema, model } = require("mongoose");

const ConsumerSchema = new Schema({
  Name: String,
  Status: String,
  Week: Number,
  Butget: Number,
  Location: String,
  Image: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

ConsumerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Consumer = model("Consumer", ConsumerSchema);

module.exports = Consumer;
