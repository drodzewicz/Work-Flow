const request = require("supertest");
const app = require("../app");
const mongoose = require("../configs/mongoose");

describe("GET /testing", () => {
    describe("given a username and password", () => {
        afterAll(async () => {
            console.log("... Test Ended");
            await mongoose.connection.close();
            app.close();
        });
        test("should respond with 200 status code", async () => {
            const response = await request(app).get("/api/testing")
            expect(response.statusCode).toBe(200)
        })
        it("should return true", () => {
            const res = 2 + 2;
            expect(res).toBe(4)
        })
    })
})
