import express from "express";
import cors from "cors";

//sets express to a variable we call app
const app = express();

//allows api calls from other domains
app.use(cors());

//sets the server to parse request body as json by default
app.use(express.json());

//data in our server
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

//sets our data as properties of our express app
app.locals.title = "HelmsKeep";
app.locals.quests = mockQuests;


//defines the get method for all of our records
//UNIVERSAL NOTE: sets the status code and sets data in JSON format
app.get("/api/quests", (request, response) => {
  response.status(200).json(app.locals.quests);
});

//defines the post method
app.post("/api/quests", (request, response) => {
  //sets a unique ID for the new record
  const newQuest = { id: Date.now(), ...request.body };

  //adds the new quest to our data as long as it has an id, title, and challenges
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

//defines our put method for editing records
app.put("/api/quests/:id", (request, response) => {
  //gets a copy of our quests and an ID from the request URL
  const { quests } = app.locals;
  const { id } = request.params;
  let found = false;

  //finds the matching record by id and replaces it with the request body data
  const mappedQuests = quests.map(quest => {
    if (quest.id === id) {
      found = true;
      quest = { ...request.body };
    } 
    return quest;
  });
  app.locals.quests = mappedQuests;

  //handles happy vs sad path responses with status codes e.g. if a match is found
  return found
    ? response.status(200).json(mappedQuests)
    : response
        .status(422)
        .json({ error: `No quest found with an id of ${id}.` });
});


//defines our get method for a specific record
app.get("/api/quests/:id", (request, response) => {
  //gets a copy of our quests and an ID from the request URL
  const { quests } = app.locals;
  const { id } = request.params;

  //finds the quest that matches the ID in the url
  const targetQuest = quests.find(quest => quest.id === id);

  //handles happy vs sad path responses with status codes e.g. if a match is found
  if (!targetQuest) {
    return response
      .status(404)
      .json({ error: `No quest found with an id of ${id}.` });
  } else {
    return response.status(200).json(targetQuest);
  }
});


//defines our delete method for a specific record
app.delete("/api/quests/:id", (request, response) => {

  //gets a copy of our quests and an ID from the request URL
  const { quests } = app.locals;
  const { id } = request.params;

  //filters our copy of the quests array to all that do not match and updates our data
  const filteredQuests = quests.filter(quest => quest.id !== id);

  //handles happy vs sad path e.g. if match is found by id
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
