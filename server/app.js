import express from "express";
// Importing the express library
import cors from "cors";
// Importing the cors library
const app = express();
// Creating an instances of an express server and assigning it to the variable app
app.use(cors());
// Tells the server to use cross-origin resource sharing
app.use(express.json());
// Tells the server to parse requests/responses from/to json

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
// Creating an array of quests objects to start out the project


app.locals.title = "HelmsKeep";
// Setting the name of locals
app.locals.quests = mockQuests;
// Saving the mock quests to locals

app.get("/api/quests", (request, response) => {
// Setting the callback function for a get request to the "/api/quests" url
  response.status(200).json(app.locals.quests);
  // Telling the sever to respond with a 200 status code and to return the full list of quests
});

app.post("/api/quests", (request, response) => {
// Setting the callback function for a post request to the "/api/quests" url
  const newQuest = { id: Date.now(), ...request.body };
  // Creating a new quest, giving it a unique id and populating it with the data from the post request
  const newQuestKeys = Object.keys(newQuest);
  // Creating an array of that new quests keys
  if (newQuestKeys.includes("id" && "title" && "challenges")) {
    // Checking to see if the object has the required data before continuing with happy path
    let { quests } = app.locals;
    // Destructuing quests from app.locals
    app.locals.quests = [...quests, newQuest];
    // Assigning the locals.quests to a new array, containing the existing quests spread in as well as the new quest
    return response.status(201).send(newQuest);
    // returning a response with a 201 status code and the newly created quests
  } else {
    // setting teh sad path
    return response.status(422).json({
      error: "Please ensure your quest has a title and at least one challenge."
    });
    // returning a 422 status code and an error message 
  }
});

app.put("/api/quests/:id", (request, response) => {
// Setting the callback function for a put request to the "/api/quests/:id" url
  const { quests } = app.locals;
  // Destructuing quests from app.locals
  const { id } = request.params;
  // Destructuing id the request params
  let found = false;
  // Creating the variable found and giving it the value of false
  const mappedQuests = quests.map(quest => {
  // Mapping thorugh the quests and assigning the result to a new variable
    if (quest.id === id) {
    // Looking to see if the current quest matches the quest from the request
      found = true;
      // If they match, reassign found to true
      quest = { ...request.body };
      // Reassign that current quest to the updated data from the request
    } 
    return quest;
    // return the quest into the quests array
  });
  app.locals.quests = mappedQuests;
  // Reassign locals to the updated quests array
  return found
  // Setting a ternary for the happy/sad path
    ? response.status(200).json(mappedQuests)
    // Send a response with a 200 status code and the new quests array for happy path
    : response
        .status(422)
        .json({ error: `No quest found with an id of ${id}.` });
    // For sad path, send a status code of 422 and an error message with the specific id
});

app.get("/api/quests/:id", (request, response) => {
// Setting the callback function for a get request to the "/api/quests/:id" url
  const { quests } = app.locals;
  // Destructuing quests from app.locals
  const { id } = request.params;
  // Destructuing id the request params
  const targetQuest = quests.find(quest => quest.id === id);
  // Iterating over the quests to find the target quest, and assigning it to a variable
  if (!targetQuest) {
  // Setting sad path for when no quest is found with a matching id
    return response
      .status(404)
      .json({ error: `No quest found with an id of ${id}.` });
    // Returning a response with a satus code of 404 and an error message with the specific id
  } else {
    // Setting happy path
    return response.status(200).json(targetQuest);
    // Returning a response with a satus code of 200 and an the correct quest data
  }
});

app.delete("/api/quests/:id", (request, response) => {
// Setting the callback function for a delete request to the "/api/quests/:id" url
  const { quests } = app.locals;
  const { id } = request.params;
  const filteredQuests = quests.filter(quest => quest.id !== id);
  // Creating a variable of filteredRequests and assigning it the value of all quests not matching the id from the request
  if (filteredQuests.length === quests.length) {
  // Setting the sad path, if the filtered quests and existing quests are the same length, meaining none of the quests matched the target id
    return response
      .status(404)
      .json({ error: `No quest found with an id of ${id}.` });
      // Returning a response with a satus code of 404 and an error message with the specific id
  } else {
    // Setting happy path
    app.locals.quests = filteredQuests;
    // Reassigning locals to the updated quests
    return response.status(200).send("Quest successfully deleted");
    // Returning a response with a satus code of 200 and a success message
  }
});

export default app;
// Exporting the instance of app to be used in the server file
