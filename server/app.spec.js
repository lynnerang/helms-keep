import request from "supertest";
import "@babel/polyfill";
import app from "./app";
import { notDeepEqual } from "assert";

describe("API", () => {
  let mockQuests;
  beforeEach(() => {
    mockQuests = [
      {
        id: "5ffsd44",
        color: "green",

        title: "My First Quest",
        challenges: [
          {
            id: "AB577C",
            isCompleted: true,
            message: "Clean the kitchen"
          },
          {
            id: "DE575F",
            isCompleted: false,
            message: "Cook dinner"
          }
        ]
      },
      {
        id: "et44trdt5",
        title: "My Second Quest",
        challenges: [
          {
            id: "MNO",
            isCompleted: false,
            message: "Learn SASS"
          },
          {
            id: "PQR",
            isCompleted: true,
            message: "Become a NODE wizard"
          }
        ]
      },
      {
        id: "et44trdt6",
        title: "My Third Quest",
        challenges: [
          {
            id: "PQV",
            isCompleted: true,
            message: "Charge phone"
          },
          {
            id: "PQX",
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
        id: "5ffsd44",
        color: "green",

        title: "My First Quest",
        challenges: [
          {
            id: "AB577C",
            isCompleted: true,
            message: "Clean the kitchen"
          },
          {
            id: "DE575F",
            isCompleted: false,
            message: "Cook dinner"
          }
        ]
      },
      {
        id: "et44trdt5",
        title: "My Second Quest",
        challenges: [
          {
            id: "MNO",
            isCompleted: false,
            message: "Learn SASS"
          },
          {
            id: "PQR",
            isCompleted: true,
            message: "Become a NODE wizard"
          }
        ]
      },
      {
        id: "et44trdt6",
        title: "My Third Quest",
        challenges: [
          {
            id: "PQV",
            isCompleted: true,
            message: "Charge phone"
          },
          {
            id: "PQX",
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
      const response = await request(app).get("/api/invalid");
      expect(response.statusCode).toBe(404);
    });
    it("Should return an array of Quests", async () => {
      const response = await request(app).get("/api/quests");
      expect(response.body).toEqual(mockQuests);
    });

    it("Should return a specific quest based on an ID argument", async () => {
      const mockQuest = {
        id: "5ffsd44",
        color: "green",

        title: "My First Quest",
        challenges: [
          {
            id: "AB577C",
            isCompleted: true,
            message: "Clean the kitchen"
          },
          {
            id: "DE575F",
            isCompleted: false,
            message: "Cook dinner"
          }
        ]
      };
      const response = await request(app).get("/api/quests/5ffsd44");
      expect(response.body).toEqual(mockQuest);
    });
    it("Should have a Status Code of 200 on successful retrieval of a Quest", async () => {
      const response = await request(app).get("/api/quests/5ffsd44");
      expect(response.statusCode).toBe(200);
    });
    it("Should have a Status Code of 404 on unsuccessful retrieval of a Quest", async () => {
      const response = await request(app).get("/api/quests/5");
      expect(response.statusCode).toBe(404);
    });
    it("Should have a response with an error of 'No quest found with an id of 5' on unsuccessful retrieval of a Quest", async () => {
      const response = await request(app).get("/api/quests/5");
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
      const response = await request(app).delete("/api/quests/5ffsd44");
      expect(response.statusCode).toBe(200);
    });
    it("Should have a Status Code of 404 on unsuccessful deletion of a Quest", async () => {
      const response = await request(app).delete("/api/quests/5");
      expect(response.statusCode).toBe(404);
    });
    it("Should have a an error on unsuccessful deletion of a Quest", async () => {
      const response = await request(app).delete("/api/quests/5");
      expect(response.body.error).toEqual(`No quest found with an id of 5.`);
    });
    it("Should delete a specific Quest based on the ID", async () => {
      expect(app.locals.quests).toHaveLength(3);
      const response = await request(app).delete("/api/quests/5ffsd44");
      expect(response.statusCode).toBe(200);
      expect(app.locals.quests).toHaveLength(2);
    });
    it("Should have a message on successful deletion of a Quest", async () => {
      const response = await request(app).delete("/api/quests/5ffsd44");
      expect(response.text).toEqual("Quest successfully deleted");
    });
  });
  describe("PUT/api/quests", () => {
    const mockQuest = {
      id: "5ffsd44",
      color: "green",

      title: "My First Quest",
      challenges: [
        {
          id: "AB577C",
          isCompleted: true,
          message: "Clean the kitchen"
        },
        {
          id: "DE575F",
          isCompleted: false,
          message: "Cook dinner"
        }
      ]
    };
    it("Should have a Status Code of 200 on successful edit of a Quest", async () => {
      const response = await request(app)
        .put("/api/quests/5ffsd44")
        .send({ ...mockQuest });
      expect(response.statusCode).toBe(200);
    });
    it("Should edit quests", async () => {
      const response = await request(app)
        .put("/api/quests/5ffsd44")
        .send({ ...mockQuest });
      expect(response.body.shift()).toEqual(mockQuest);
    });
    it("Should have an Status Code of 422 on unsuccessful edit of a Quest'", async () => {
      const response = await request(app)
        .put("/api/quests/5")
        .send({ ...mockQuest });
      expect(response.statusCode).toBe(422);
    });
    it("Should have an error response of 'No quest found with an id of 5.'", async () => {
      const response = await request(app)
        .put("/api/quests/5")
        .send({ ...mockQuest });
      expect(response.body.error).toEqual("No quest found with an id of 5.");
    });
  });
});
