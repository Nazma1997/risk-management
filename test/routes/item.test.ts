
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
        [userToken, officerToken, managerToken, adminToken] = await Promise.all([
            signToken({ email: "user@gmail.com", password: "123456" }),
            signToken({ email: "officer@gmail.com", password: "123456" }),
            signToken({ email: "manager@gmail.com", password: "123456" }),
            signToken({ email: "admin@gmail.com", password: "123456" }),
        ]);
      
    });
    

    test("Should create an item", async () => {
        const response = await request(app)
            .post("/api/v1/loans/create")
            .set("Authorization", `Bearer ${userToken}`)
            .send({
                name: "Loanb dfgdgtr ",
                description: "loan descriptionfchgdfyhrtyhurt",
                price: 123
            });
      // console.log("Response Status:", response);
       // console.log("Response Body:", response.body);

        expect(response.status).toBe(201);

        expect(response.body);
        createdItemId = response.body.item.id;
    });
    test("Should review an item", async () => {

      
        const response = await request(app)
            .put(`/api/v1/loans/${createdItemId}/review`)
            .set("Authorization", `Bearer ${officerToken}`)
            .send({
                is_reviewed: true,
                updated_at: new Date()
            });

        expect(response.status).toBe(200);
        expect(response.body.status);
    });

    test("Should approve an item", async () => {
        const response = await request(app)
            .put(`/api/v1/loans/${createdItemId}/approve`)
            .set("Authorization", `Bearer ${managerToken}`)
            .send({
                is_approved: true,
                updated_at: new Date()
            });

        expect(response.status).toBe(200);
        expect(response.body.status);
    });

    test("Should fetch all items", async () => {
        const response = await request(app)
            .get("/api/v1/loans")
            .set("Authorization", `Bearer ${managerToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body));
    });

   

});
