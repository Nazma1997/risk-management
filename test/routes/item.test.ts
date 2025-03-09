import request from "supertest";
import app from "../../src/app"; // Adjust the path based on your project structure
import { signToken } from "../../src/api/v1/utils/auth"; // Import the function

describe("Item Service Tests", () => {
    let userToken: string;
    let officerToken: string;
    let managerToken: string;
    let adminToken: string;
    let createdItemId: string;

    beforeAll(async () => {
        const tokens = await Promise.all([
            signToken({ email: "user@gmail.com", password: "123456" }),
            signToken({ email: "officer@gmail.com", password: "123456" }),
            signToken({ email: "manager@gmail.com", password: "123456" }),
            signToken({ email: "admin@gmail.com", password: "123456" }),
        ]);
    
        [userToken, officerToken, managerToken, adminToken] = tokens;
    });
    
    
    test("Should create an item", async () => {
        const response = await request(app)
            .post("/api/v1/loan/create")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                name: "Test Item",
                description: "Test item description",
                price: 123
            });

        expect(response.status);
        expect(response.body);
        createdItemId = response.body.id;
    });
    test("Should review an item", async () => {
        const response = await request(app)
            .put(`/api/v1/loan/${createdItemId}/review`)
            .set("Authorization", `Bearer ${officerToken}`)
            .send({
                is_reviewed:true,
            });

        expect(response.status);
        expect(response.body.status);
    });

    test("Should approve an item", async () => {
        const response = await request(app)
            .put(`/api/v1/loans/${createdItemId}/approve`)
            .set("Authorization", `Bearer ${managerToken}`)
            .send({
                is_approved: true,
            });

        expect(response.status);
        expect(response.body.status);
    });

    test("Should fetch all items", async () => {
        const response = await request(app)
            .get("/api/v1/loan")
            .set("Authorization", `Bearer ${managerToken}`);

        expect(response.status);
        expect(Array.isArray(response.body));
    });

    test("Should delete an item", async () => {
        const response = await request(app)
            .delete(`/api/v1/loan/${createdItemId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.status);
        expect(response.body.message);
    });


 
});
