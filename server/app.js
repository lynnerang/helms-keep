import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

const mockQuests = [
  {
    id: '5ffsd44',
    color: 'green',
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
    id: 'et44trdt5',
    color: 'green',
    title: "My Third Quest",
    challenges: [
      {
        id: "MNO",
        isCompleted: true,
        message: "Charge phone"
      },
      {
        id: "PQR",
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
    return response.status(201).send(newQuest);
  } else {
    return response.status(422).json({
      error: "Please ensure your quest has a title and at least one challenge."
    });
  }
});

app.put("/api/quests/:id", (request, response) => {
  const { quests } = app.locals;
  const { id } = request.params;
  let found = false;
  const mappedQuests = quests.map(quest => {
    if (quest.id === id) {
      found = true;
      quest = { ...request.body };
    } 
    return quest;
  });
  app.locals.quests = mappedQuests;
  return found
    ? response.status(200).json(mappedQuests)
    : response
        .status(422)
        .json({ error: `No quest found with an id of ${id}.` });
});

app.get("/api/quests/:id", (request, response) => {
  const { quests } = app.locals;
  const { id } = request.params;
  const targetQuest = quests.find(quest => quest.id === id);
  if (!targetQuest) {
    return response
      .status(404)
      .json({ error: `No quest found with an id of ${id}.` });
  } else {
    return response.status(200).json(targetQuest);
  }
});

app.delete("/api/quests/:id", (request, response) => {
  const { quests } = app.locals;
  const { id } = request.params;
  const filteredQuests = quests.filter(quest => quest.id !== id);
  if (filteredQuests.length === quests.length) {
    return response
      .status(404)
      .json({ error: `No quest found with an id of ${id}.` });
  } else {
    app.locals.quests = filteredQuests;
    return response.status(200).send("Quest successfully deleted");
  }
});

export default app;
