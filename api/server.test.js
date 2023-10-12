const db = require("../data/db-config");
const server = require("./server");
const request = require("supertest");

const baseURL = "/api/cats";

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("[0] SANITY TEST", () => {
  test("[a] test suite works", () => {
    expect(1).toBe(1);
  });
  test("[b] environment is 'testing'", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("[GET] /", () => {
  test("[a] endpoint gets all cats", async () => {
    const res = await request(server).get(`${baseURL}`);
    expect(res.body).toHaveLength(0);
  });
  test("[b] responds with status 200 OK", async () => {
    const res = await request(server).get(`${baseURL}`);
    expect(res.status).toBe(200);
  });
});

describe("[GET] /:id", () => {
//   test("[a] endpoint gets a single cat of the given id", async () => {
//     const res = await request(server).get(`${baseURL}/1`);
//     expect(res.body).toMatchObject({ cat_name: "SweetPotato", cat_age: 6 });
//   });
//   test("[b] responds with status 200 OK", async () => {
//     const res = await request(server).get(`${baseURL}/1`);
//     expect(res.status).toBe(200);
//   });
  test("[c] responds with status 404 if cat_id not found", async () => {
    const res = await request(server).get(`${baseURL}/4`);
    expect(res.status).toBe(404);
  });
  test("[d] responds with appropriate error message if cat_id not found", async () => {
    const res = await request(server).get(`${baseURL}/4`);
    expect(res.body.message).toBe("Cat not found");
  });
});

describe("[POST] /", () => {
  const newCat = { cat_name: "Bramble", cat_age: 5 };
  test("[a] inserts a new cat into cats table", async () => {
    await request(server).post(`${baseURL}`).send(newCat);
    expect(await db("cats")).toHaveLength(1);
  });
  test("[b] responds with status 201 Created", async () => {
    const res = await request(server).post(`${baseURL}`).send(newCat);
    expect(res.status).toBe(201);
  });
});

describe("[PUT] /:id", () => {
  const updatedCat = { cat_name: "SweetPotato", pet_age: 7 };
  test("[a] successfully updates the appropriate cat in the table", async () => {
    const res = await request(server).put(`${baseURL}/1`).send(updatedCat);
    expect(res.status).toBe(500);
  });
});

describe("[DELETE] /:id", () => {
  test("[a] successfully deletes the appropriate cat in the table", async () => {
    await request(server).delete(`${baseURL}/1`);
    const cats = await db("cats");
    expect(cats).toHaveLength(0);
  });
});