import request from "supertest";
import "@babel/polyfill";
import app from "./app";

describe("API", () => {
  let mockQuests;
  beforeEach(() => {
    mockQuests = [
      {
        id: 1,
        title: "My First Quest",
        challenges: [
          {
            id: 1,
            isCompleted: true,
            message: "Clean the kitchen"
          },
          {
            id: 2,
            isCompleted: false,
            message: "Cook dinner"
          }
        ]
      },
      {
        id: 2,
        title: "My Second Quest",
        challenges: [
          {
            id: 1,
            isCompleted: false,
            message: "Learn SASS"
          },
          {
            id: 2,
            isCompleted: true,
            message: "Become a NODE wizard"
          }
        ]
      },
      {
        id: 3,
        title: "My Third Quest",
        challenges: [
          {
            id: 1,
            isCompleted: true,
            message: "Charge phone"
          },
          {
            id: 2,
            isCompleted: false,
            message: "Dance until the sun comes up"
          }
        ]
      }
    ];
    app.locals.quests = mockQuests;
  });
  afterEach(() => {
    mockQuests = [
      {
        id: 1,
        title: "My First Quest",
        challenges: [
          {
            id: 1,
            isCompleted: true,
            message: "Clean the kitchen"
          },
          {
            id: 2,
            isCompleted: false,
            message: "Cook dinner"
          }
        ]
      },
      {
        id: 2,
        title: "My Second Quest",
        challenges: [
          {
            id: 1,
            isCompleted: false,
            message: "Learn SASS"
          },
          {
            id: 2,
            isCompleted: true,
            message: "Become a NODE wizard"
          }
        ]
      },
      {
        id: 3,
        title: "My Third Quest",
        challenges: [
          {
            id: 1,
            isCompleted: true,
            message: "Charge phone"
          },
          {
            id: 2,
            isCompleted: false,
            message: "Dance until the sun comes up"
          }
        ]
      }
    ];
    app.locals.quests = mockQuests;
  });
  describe("GET/api/quests", () => {
    it("Should have a Status Code of 200 on successful GET", async () => {
      const response = await request(app).get("/api/quests");
      expect(response.statusCode).toBe(200);
    });
    it("Should have a Status code of 404 on unsuccessful GET", async () => {
      const response = await request(app).get("/api/wrongAPI");
      expect(response.statusCode).toBe(404);
    });
    it("Should return an array of Quests", async () => {
      const response = await request(app).get("/api/quests");
      expect(response.body).toEqual(mockQuests);
    });

    it("Should return a specific quest based on an ID argument", async () => {
      const mockQuest = {
        id: 1,
        title: "My First Quest",
        challenges: [
          {
            id: 1,
            isCompleted: true,
            message: "Clean the kitchen"
          },
          {
            id: 2,
            isCompleted: false,
            message: "Cook dinner"
          }
        ]
      };
      const response = await request(app).get("/quests/1");
      expect(response.body).toEqual(mockQuest);
    });
    it("Should have a Status Code of 200 on successful retrieval of a Quest", async () => {
      const response = await request(app).get("/quests/1");
      expect(response.statusCode).toBe(200);
    });
    it("Should have a Status Code of 404 on unsuccessful retrieval of a Quest", async () => {
      const response = await request(app).get("/quests/5");
      expect(response.statusCode).toBe(404);
    });
    it("Should have a response with an error of 'No quest found with an id of 5' on unsuccessful retrieval of a Quest", async () => {
      const response = await request(app).get("/quests/5");
      expect(response.body.error).toEqual("No quest found with an id of 5.");
    });
  });
  describe("POST/api/quests", () => {
    it("Should have a Status Code of 201 on successful creation of a new Quest", async () => {
      const response = await request(app)
        .post("/api/quests")
        .send({
          title: "Max's Quest",
          challenges: [
            { id: 1, isCompleted: true, message: "Dancing to the moon" }
          ]
        });
      expect(response.statusCode).toBe(201);
    });
    it("Should create a new Quest", async () => {
      const response = await request(app)
        .post("/api/quests")
        .send({
          title: "Max's Quest",
          challenges: [
            { id: 4, isCompleted: true, message: "Dancing to the moon" }
          ]
        });
      expect(app.locals.quests).toHaveLength(4);
    });
    it("Should have a Status Code of 422 on unsuccessful creation of a new Quest", async () => {
      const response = await request(app)
        .post("/api/quests")
        .send({});
      expect(response.statusCode).toBe(422);
    });
    it("Should have a response error of 'Please ensure your quest has a title and at least one challenge' on unsuccessful creation of a new Quest", async () => {
      const response = await request(app)
        .post("/api/quests")
        .send({});
      expect(response.body.error).toEqual(
        "Please ensure your quest has a title and at least one challenge."
      );
    });
  });
  describe("DELETE/api/quests", () => {
    it("Should have a Status Code of 200 on successful deletion of a Quest", async () => {
      const response = await request(app).delete("/quests/1");
      expect(response.statusCode).toBe(200);
    });
    it("Should have a Status Code of 404 on unsuccessful deletion of a Quest", async () => {
      const response = await request(app).delete("/quests/5");
      expect(response.statusCode).toBe(404);
    });
    it("Should have a an error on unsuccessful deletion of a Quest", async () => {
      const response = await request(app).delete("/quests/5");
      expect(response.body.error).toEqual(`No quest found with an id of 5.`);
    });
    it("Should delete a specific Quest based on the ID", async () => {
      expect(app.locals.quests).toHaveLength(3);
      const response = await request(app).delete("/quests/1");
      expect(response.statusCode).toBe(200);
      expect(app.locals.quests).toHaveLength(2);
    });
    it("Should have a message on successful deletion of a Quest", async () => {
      const response = await request(app).delete("/quests/1");
      expect(response.text).toEqual("Quest successfully deleted");
    });
  });
  describe("PUT/api/quests", () => {
    const mockQuest = {
      id: 1,
      title: "My First Quest",
      challenges: [
        {
          id: 1,
          isCompleted: true,
          message: "Clean the kitchen"
        },
        {
          id: 2,
          isCompleted: false,
          message: "Cook dinner"
        }
      ]
    };
    it.skip("Should have a Status Code of 200 on successful edit of a Quest", async () => {
      const response = await request(app)
        .put("/quests/1")
        .send({ mockQuest });
      expect(response.statusCode).toBe(200);
    });
  });
});
