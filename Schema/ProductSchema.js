const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  Name: String,
  Image: String,
  Status: String,
  finalDate: Date,
  startDate: Date,
  consumers: {
    type: Schema.Types.ObjectId,
    ref: "Consumer",
  },
  kanbans:{
    type: Schema.Types.ObjectId,
    ref: "Kanban",
  },
  totalAmount: Number,
  Location: String,
});

ProductSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = model("Product", ProductSchema);

module.exports = Product;
