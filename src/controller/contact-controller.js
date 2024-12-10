const { Op } = require("sequelize");
const { Contact } = require("../../models");
const contactSchema = require("../validation/contact-schema");

module.exports = {
  list: async (req, res) => {
    try {
      const search = req.query.cari || "";
      const page = req.query.page || 1;
      const limit = parseInt(req.query.limit) || 25;
      const offset = 0 + (page - 1) * limit;

      const data = await Contact.findAndCountAll({
        where: {
          nama_lengkap: {
            [Op.like]: `%${search}%`,
          },
        },
        limit,
        offset,
      });

      return res
        .status(200)
        .set({
          x_total_data: data.count,
          x_total_page: Math.ceil(data.count / limit),
          x_page_limit: limit,
          x_current_page: page,
        })
        .json({
          status: 200,
          message: "OK",
          data: data.rows,
        });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "INTERNAL SERVER ERROR",
        error: err.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await Contact.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!data) {
        return res.status(404).json({
          status: 404,
          message: "NOT FOUND",
          error: `data tidak ditemukan`,
        });
      }

      return res.status(200).json({
        status: 200,
        message: "OK",
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "INTERNAL SERVER ERROR",
        error: err.message,
      });
    }
  },

  create: async (req, res) => {
    try {
      var { error, value } = contactSchema.insertEdit.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: "BAD REQUEST",
          error: error.message,
        });
      }

      const result = await Contact.create(value);

      res.status(201).json({
        status: 201,
        message: "CREATED",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "INTERNAL SERVER ERROR",
        error: err.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const data = await Contact.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!data) {
        return res.status(404).json({
          status: 404,
          message: "NOT FOUND",
          error: `data tidak ditemukan`,
        });
      }

      const { error, value } = contactSchema.insertEdit.validate(req.body);

      if (error) {
        return res.status(400).json({
          status: 400,
          message: "BAD REQUEST",
          error: error.message,
        });
      }

      const result = await data.update(value);

      return res.status(200).json({
        status: 200,
        message: "OK",
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "INTERNAL SERVER ERROR",
        error: err.message,
      });
    }
  },

  remove: async (req, res) => {
    try {
      const data = await Contact.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!data) {
        return res.status(404).json({
          status: 404,
          message: "NOT FOUND",
          error: `data tidak ditemukan`,
        });
      }

      await data.destroy();

      return res.status(204).json();
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "INTERNAL SERVER ERROR",
        error: err.message,
      });
    }
  },
};
