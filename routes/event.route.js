const express = require("express");
const EventController = require("../controllers/event.controllers");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/").get(EventController.listEvents);
router.get("/:id", EventController.getEvent);
router.post("/", EventController.createEvent);
module.exports = router;
