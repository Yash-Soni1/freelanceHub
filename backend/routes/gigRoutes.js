// routes/gigRoutes.js
const router = require("express").Router();
const {
  createGig,
  getAllGigs,
  getGigById,
  getFreelancerGigs,
  deleteGig,
  updateGig
} = require("../controllers/gigController");

const { verifyToken, isFreelancer } = require("../middleware/authMiddleware");

router.post("/", verifyToken, isFreelancer, createGig);
router.get("/", getAllGigs);
router.get("/my", verifyToken, isFreelancer, getFreelancerGigs);
router.get("/:id", getGigById);
router.delete("/:id", verifyToken, isFreelancer, deleteGig);
router.put("/:id", verifyToken, isFreelancer, updateGig);

module.exports = router;
