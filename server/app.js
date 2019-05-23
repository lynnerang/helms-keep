//! RUN NODE SERVER WITH **** node -r esm server.js  ****

import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

const mockQuests = [
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

app.locals.title = "HelmsKeep";
app.locals.quests = mockQuests;

app.get("/api/quests", (request, response) => {
  response.status(200).json(app.locals.quests);
});

app.post("/api/quests", (request, response) => {
  const newQuest = { id: Date.now(), ...request.body };
  const newQuestKeys = Object.keys(newQuest);

  if (newQuestKeys.includes("id" && "title" && "challenges")) {
    let { quests } = app.locals;
    app.locals.quests = [...quests, newQuest];
    return response.status(201).send({ id: newQuest.id });
  } else {
    return response.status(422).json({
      error: "Please ensure your quest has a title and at least one challenge."
    });
  }
});

app.put("/api/quests/:id", (request, response) => {
  const { quests } = app.locals;
  const { id } = request.params;
  const targetQuestId = quests.findIndex(quest => quest.id === +id);
  const editedQuest = { ...request.body };
  const editedQuestKeys = Object.keys(editedQuest);

  if (
    targetQuestId >= 0 &&
    editedQuestKeys.includes("id" && "title" && "challenges")
  ) {
    quests.splice(targetQuestId, 1, editedQuest);
    return response.status(200).json(editedQuest);
  } else if (targetQuestId === -1) {
    return response
      .status(404)
      .json({ error: `No quest found with an id of ${id}.` });
  } else if (!editedQuestKeys.includes("id" && "title" && "challenges")) {
    return response.status(422).json({
      error: "Please ensure your quest has a title and at least one challenge."
    });
  } else {
    return response.status(400).json({
      error: "Unkown error, please try again."
    });
  }
});

app.get("/quests/:id", (request, response) => {
  const { quests } = app.locals;
  const { id } = request.params;
  const targetQuest = quests.find(quest => quest.id == id);

  if (!targetQuest) {
    return response
      .status(404)
      .json({ error: `No quest found with an id of ${id}.` });
  } else {
    return response.status(200).json(targetQuest);
  }
});

app.delete("/quests/:id", (request, response) => {
  const { quests } = app.locals;
  const { id } = request.params;
  const targetQuestId = quests.findIndex(quest => quest.id === +id);
  if (targetQuestId === -1) {
    return response
      .status(404)
      .json({ error: `No quest found with an id of ${id}.` });
  } else {
    const filteredQuests = quests.filter(quest => quest.id !== +id);
    app.locals.quests = filteredQuests;

    return response.status(200).send("Quest successfully deleted");
  }
});

export default app;
