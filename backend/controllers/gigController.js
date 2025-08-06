const Gig = require("../models/Gig");

exports.createGig = async (req, res) => {
  try {
    const gig = await Gig.create({ ...req.body, freelancer: req.user.id });
    res.status(201).json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find()
      .populate("freelancer", "name") // Only include freelancer name
      .sort({ createdAt: -1 }); // Latest first
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gigs", error });
  }
};

exports.getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate("freelancer", "name email");
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.status(200).json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFreelancerGigs = async (req, res) => {
  try {
    const gigs = await Gig.find({ freelancer: req.user.id }).populate("freelancer", "name email");
    res.status(200).json(gigs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.freelancer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await gig.deleteOne();
    res.status(200).json({ message: "Gig deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.freelancer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updates = req.body;
    Object.assign(gig, updates);
    await gig.save();

    res.status(200).json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
