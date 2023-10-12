const db = require("../../data/db-config");

const get = () => {
  return db("cats");
};

const getById = (cat_id) => {
  return db("cats").where("cat_id", cat_id).first();
};

const insert = (cat) => {
  return db("cats").insert(cat);
};

const change = (cat_id, cat) => {
  return db("cats").where("cat_id", cat_id).update(cat);
};

const remove = (cat_id) => {
  return db("cats").where("cat_id", cat_id).del();
};

module.exports = {
  get,
  getById,
  insert,
  change,
  remove,
};