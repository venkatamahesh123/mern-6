const express = require("express");
const Leave = require("../models/Leave");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();
// Utility function to handle errors
consthandleError = (res, err, message = "An error occurred") => {
console.error(message, err);
res.status(500).json({ message });
};
// Submit a Leave Request
router.post("/", async (req, res) => {
const{ userId, username, reason, dates, status } = req.body;
try {
console.log("Leave request received:", req.body);
// Validate required fields
if (!userId || !username || !reason || !dates || dates.length === 0) {
console.log("Validation failed: Missing fields");
return res.status(400).json({ message: "All fields are required" });
}
// Create and save the new leave request
constnewLeave = new Leave({ userId, username, reason, dates, status });
await newLeave.save();
console.log("Leave request saved successfully");
res.status(201).json({ message: "Leave request submitted successfully" });
} catch (err) {
handleError(res, err, "Error submitting leave request");
}
});
//Get All Leave Requests
router.get("/", async (req, res) => {
try {
constleaveRequests = await Leave.find();
res.json(leaveRequests);
} catch (err) {
handleError(res, err, "Error fetching leave requests");
}
});
// Update Leave Status
router.put("/:id", async (req, res) => {
const{ status } = req.body;
try {
// Validate the status value
constvalidStatuses = ["Pending", "Approved", "Declined"];
if (!validStatuses.includes(status)) {
return res.status(400).json({ message: "Invalid status value" });
}
// Update the leave request status
constupdatedLeave = await Leave.findByIdAndUpdate(
req.params.id,
{ status },
{ new: true } // Return the updated document
);
if (!updatedLeave) {
return res.status(404).json({ message: "Leave request not found" });
}
res.json({
message: "Leave status updated successfully",
leave: updatedLeave,
});
} catch (err) {
handleError(res, err, "Error updating leave status");
}
});
module.exports = router;