import request from "supertest";
import app from "../../src/app"; // Adjust the import path if needed

describe("Express App Tests", () => {

    // Test the root route
    test("Should return a message for the root route", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text);
    });






});

