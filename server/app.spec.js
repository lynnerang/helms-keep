import request from "supertest";
import "@babel/polyfill";
import app from "./app";

describe("API", () => {
  describe("GET/api/quests", () => {
    let mockQuests;
    beforeEach(() => {
      mockQuests = {
        id: 1,
        title: "My First Quest",
        challenges: [
          {
            id: 1,
            isCompleted: false,
            message: "Clean the kitchen"
          },
          {
            id: 2,
            isCompleted: false,
            message: "Cook dinner"
          }
        ]
      };
      app.locals.quests = mockQuests;
    });

    it("Should have a Status Code of 200 on successful GET", async () => {
      const response = await request(app).get("/api/quests");
      expect(response.statusCode).toBe(200);
    });
  });
});
