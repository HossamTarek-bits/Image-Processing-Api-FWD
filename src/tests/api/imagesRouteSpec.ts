// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import app from "../../app";

describe("Imgaes Route Suite", (): void => {
  describe("GET /api/images Specs", (): void => {
    it("should return status code 200 when send valid filename,width,height", (): void => {
      request(app)
        .get("/api/images")
        .query({ filename: "palmtunnel", width: "300", height: "150" })
        .expect(200);
    });
    it("should return status code 400 when don't send filename", (): void => {
      request(app)
        .get("/api/images")
        .query({ width: "300", height: "150" })
        .expect(400);
    });
    it("should return status code 400 when don't send width", (): void => {
      request(app)
        .get("/api/images")
        .query({ filename: "palmtunnel", height: "150" })
        .expect(400);
    });
    it("should return status code 400 when don't send height", (): void => {
      request(app)
        .get("/api/images")
        .query({ filename: "palmtunnel", width: "300" })
        .expect(400);
    });
    it("should return status code 400 when send invalid filename", (): void => {
      request(app)
        .get("/api/images")
        .query({ filename: "fake file", width: "300", height: "150" })
        .expect(400);
    });
  });
});
