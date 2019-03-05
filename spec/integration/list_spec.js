const request = require("request");
const base = "http://localhost:3000/list";

describe("routes : list", () => {
  describe("GET /list", () => {
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });


});