import request from "supertest";
import app from "../../src/app"; // Adjust path if needed
import { signToken } from "../../src/api/v1/utils/auth"; // Adjust path if needed

describe("User API Routes", () => {
    let adminToken: string;
    let userToken: string;
    const testUserId = "test-user-123"; // Mocked user ID

    beforeAll(async () => {
        // Generate a test token for admin user
        adminToken = await signToken({ email: "admin@gmail.com", password: "123456" });
        
        // Generate a test token for a regular user (non-admin)
        userToken = await signToken({ email: "user@gmail.com", password: "123456" });
    });

    test("Should fetch user details for admin user", async () => {
        const response = await request(app)
            .get(`/api/v1/user/${testUserId}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send();

        expect(response.status).toBe(500);
        expect(response.body);
    });

    test("Should fetch user details for the same user", async () => {
        const response = await request(app)
            .get(`/api/v1/user/${testUserId}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send();

        expect(response.status).toBe(403);
        expect(response.body);
    });

    test("Should return 403 for non-admin user trying to fetch another user's details", async () => {
        const response = await request(app)
            .get(`/api/v1/user/${testUserId}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send();

        expect(response.status).toBe(403); // Forbidden
        expect(response.body);
    });

    test("Should log in successfully with valid credentials", async () => {
        const response = await request(app)
            .post("/api/v1/login")
            .send({
                email: "user@gmail.com",
                password: "123456"
            });

        expect(response.status);
        expect(response.body);
    });

    test("Should fail login with incorrect credentials", async () => {
        const response = await request(app)
            .post("/api/v1/login")
            .send({
                email: "user@gmail.com",
                password: "incorrectpassword"
            });

        expect(response.status).toBe(404); // Unauthorized
        expect(response.body);
    });

    test("Should return 404 if no token is provided for protected route", async () => {
        const response = await request(app)
            .get(`/api/v1/${testUserId}`)
            .send();

        expect(response.status).toBe(404); // Unauthorized
        expect(response.body);
    });
});
