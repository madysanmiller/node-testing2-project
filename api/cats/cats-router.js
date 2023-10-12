const express = require("express");
const Cat = require("./cats-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  await Cat.get()
    .then((cats) => {
      res.json(cats);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Cat.getById(id)
    .then((cat) => {
      if (!cat) {
        next({ status: 404, message: "Cat not found" });
      } else {
        res.json(cat);
      }
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  await Cat.insert(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Cat.change(id, req.body)
    .then((result) => {
      res.status(204).json(result);
    })
    .catch(next);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Cat.remove(id)
    .then((result) => {
      res.status(204).json(result);
    })
    .catch(next);
});

module.exports = router;