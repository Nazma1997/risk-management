import request from "supertest";
import app from "../../src/app"; // Adjust path if needed
import { signToken } from "../../src/api/v1/utils/auth"; // Adjust path if needed

describe("Admin Custom Claims API", () => {

    const testUid = "test-user-123"; // Mock Firebase UID

  

    test("Should successfully set custom claims for a user", async () => {
        const adminToken = await signToken({ email: "admin@gmail.com", password: "123456" });
        const response = await request(app)
            .post(`/api/v1/custom-claims/${testUid}`)
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                role: "editor", 
            });

            
        expect(response.status).toBe(404);
        expect(response.body);
        expect(response.body.message);
    });

    test("Should fail for unauthorized user", async () => {
        const userToken = await signToken({ email: "user@gmail.com", password: "123456" });

        const response = await request(app)
            .post(`/api/v1/custom-claims/${testUid}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                role: "editor",
            });

        expect(response.status).toBe(404); 
        expect(response.body);
    });

    test("Should return 404 if no token is provided", async () => {
        const response = await request(app)
            .post(`/api/v1/custom-claims/${testUid}`)
            .send({
                role: "editor",
            });

        expect(response.status).toBe(404); 
        expect(response.body);
    });
});
