const express = require('express');
const server = express();
const cors = require("cors");

const mockQuest = {
  id: 1,
  title: "My First Quest",
  tasks: [{
    id: 1,
    isCompleted: false, 
    message: 'Clean the kitchen'
  }, {
    id: 2,
    isCompleted: false, 
    message: 'Cook dinner'
  }]
};

server.set("port", process.env.PORT || 5000);
server.locals.title = "HelmsKeep";
server.locals.quests = [mockQuest]

server.use(cors());
server.use(express.json());

server.get('/api/quests', (request, response) => {
  response.status(200).json(server.locals.quests);
});

server.post('/api/quests', (request, response) => {
  const newQuest = { id: Date.now(), ...request.body }
  const newQuestKeys = Object.keys(newQuest);

  if (newQuestKeys.includes('id' && 'title' && 'tasks')) {
    let { quests } = server.locals;
    server.locals.quests = [...quests, newQuest];
    return response.status(201).send({ id: newQuest.id});
  } else {
    return response.status(422).json({
      error: 'Please ensure your quest has a title and at least one challenge.'
    })
  }
});

server.put('/quests/:id', (request, response) => {
  const { quests } = server.locals;
  const { id } = request.params;
  const targetQuestId = quests.indexOf(quest => quest.id === id);
  const editedQuest = {...request.body}
  const editedQuestKeys = Object.keys(editedQuest);

  if (targetQuestId >= 0 && editedQuestKeys.includes('id' && 'title' && 'tasks')) {
    quests.splice(targetQuestId, 1, editedQuest);
    return response.status(200).json(editedQuest);
  } else if (targetQuestId === -1) {
    return response.status(404).json({ error: `No quest found with an id of ${id}.`})
  } else if (!editedQuestKeys.includes('id' && 'title' && 'tasks')) {
    return response.status(422).json({
      error: 'Please ensure your quest has a title and at least one challenge.'
    });
  } else {
    return response.status(400).json({
      error: 'Unkown error, please try again.'
    });
  }
});

server.get('/quests/:id', (request, response) => {
  const { quests } = server.locals;
  const { id } = request.params;
  const targetQuest = quests.find(quest => quest.id == id);

  if (!targetQuest) {
    return response.status(404).json({ error: `No quest found with an id of ${id}.`})
  } else {
    return response.status(200).json(targetQuest);
  }
});

server.delete("/quests/:id", (request, response) => {
  const { quests } = server.locals;
  const { id } = request.params;
  const questIds = quests.map(quest => quest.id);
  const targetQuestId = questIds.indexOf(parseInt(id));

  if (targetQuestId === -1) {
    return response
      .status(404)
      .json({ error: `No quest found with an id of ${id}.` });
  } else {
    quests.splice(targetQuestId, 0);
    return response.status(200).send('Quest successfuly deleted');
  }
});



server.listen(server.get('port'), () => 
  console.log(`${server.locals.title} is running on http://localhost:${server.get('port')}`)
);
