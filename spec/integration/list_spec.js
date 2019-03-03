const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/list";
const newItem = "http://localhost:3000/list/newItem";
let list = [];

describe("routes : list", () => {
  describe("GET /list", () => {
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toContain("Add items to list");
        done();
      });
    });
  });


});