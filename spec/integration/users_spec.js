const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/models/user");

describe("routes : users", () => {
  describe("GET /users/sign_in", () => {
    it("should return status code 200", (done) => {
      request.get(base + "sign_in" , (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });
  describe("GET /users/sign_out", () => {
    it("should return status code 200", (done) => {
      request.get(base + "sign_out" , (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });

});