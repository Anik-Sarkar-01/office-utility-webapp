const express = require("express");
const {
  applyForLeave,
  approveLeave,
  leaveEmployee,
  pastLeaves,
} = require("../controllers/leaveContoller");

const generateLeaveForm = require("../services/leaveFormGenerator");

const leaveRoutes = express.Router();

// Existing routes
leaveRoutes.get("/applied-leave", leaveEmployee);

leaveRoutes.patch("/applyForleave/:uid", applyForLeave);
leaveRoutes.patch("/approve-leave/:leaveId", approveLeave);

// 🧾 NEW: Generate & Download Leave Form
leaveRoutes.post("/generate-form", async (req, res, next) => {
  console.log("I am in the leave routes")
  try {
    const pdfBytes = await generateLeaveForm(req.body);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=LeaveApplicationForm.pdf");

    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    next(error);
  }
});

module.exports = leaveRoutes;
