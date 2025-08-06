const mongoose = require("mongoose");

const gigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryTime: { type: Number, required: true }, // in days
    category: { type: String, required: true },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: [String], // optional for now
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gig", gigSchema);
