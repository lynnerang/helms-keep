export const questsReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_QUESTS':
      return action.payload.quests
    case 'ADD_QUEST':
      const quests = [...state, action.payload.quest];
      return quests;
    case 'EDIT_QUEST': 
      const { id } = action.payload.quest;
      const workingQuests = [...state];
      const targetIndex = workingQuests.findIndex(quest => quest.id === id);
      console.log('WORKING', workingQuests)
      workingQuests.splice(
        targetIndex,
        1,
        action.payload.quest
      );
      console.log("UPDATED", workingQuests);
      return workingQuests;
    default:
      return state;
  }
};
