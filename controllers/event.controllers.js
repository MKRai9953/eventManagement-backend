const { Op } = require("sequelize");
const { Event, User } = require("../models");

// Get all events with filters, sorting, and searching
async function listEvents(req, res) {
  try {
    const { title, date, sort, limit, offset } = req.query;
    const filters = {};
    const order = [];

    if (title) {
      filters.eventName = { [Op.like]: `%${title}%` };
    }
    if (date) {
      filters.date = date;
    }
    if (sort) {
      const [sortField, sortOrder] = sort.split(":");
      order.push([sortField, sortOrder]);
    } else {
      order.push(["createdAt", "DESC"]);
    }

    const events = await Event.findAll({
      where: filters,
      include: [User],
      order,
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Error fetching events" });
  }
}

// Get a single event by ID
async function getEvent(req, res) {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id, { include: [User] });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Error fetching event" });
  }
}

// Create a new event
async function createEvent(req, res) {
  try {
    const {
      eventName: name,
      date: start_date,
      time: start_time,
      duration,
      location,
      userIds,
      reminder: notification_time,
    } = req.body;
    const filePath = req.file ? req.file.path : null;

    const event = await Event.create({
      name,
      start_date,
      start_time,
      duration,
      location,
      notification_time,
      files: filePath,
    });

    if (userIds && userIds.length > 0) {
      const users = await User.findAll({ where: { id: userIds } });
      await event.setUsers(users);
    }

    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Error creating event" });
  }
}

module.exports = { listEvents, getEvent, createEvent };
