const { Router } = require("express");
const {
  list,
  getById,
  create,
  update,
  remove,
} = require("../controller/contact-controller");

const contact = Router();

contact.get("/", list);
contact.get("/:id", getById);
contact.post("/", create);
contact.put("/:id", update);
contact.delete("/:id", remove);

module.exports = contact;
