const Joi = require("joi");

const contactSchema = {
  insertEdit: Joi.object({
    nama_lengkap: Joi.string().required(),
    keterangan: Joi.string().required(),
  }),
};

module.exports = contactSchema;
