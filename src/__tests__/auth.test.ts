import supertest from "supertest";
import app from "../app";

describe("auth", () => {
  describe("register", () => {
    describe("given that the user details are invalid", () => {
      it("should return STATUS CODE 400", async () => {
        const users = [
          {
            name: "Shakeeb123", //Invalid
            email: "shak@gmil.in",
            password: "Shakeeb@123",
          },
          {
            name: "Shakeeb123",
            email: "shakgmilin", //Invalid
            password: "Shakeeb@123",
          },
          {
            name: "Shakeeb123",
            email: "shak@gmil.in",
            password: "Shakeeb", //Invalid
          },
        ];

        for (let user of users) {
          await supertest(app)
            .post("/api/auth/register")
            .send(user)
            .set("Accept", "application/json")
            .expect(400);
        }
      });
    });
  });
});
