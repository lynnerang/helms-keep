export const questsReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_QUESTS':
      return action.payload.quests
    case 'ADD_QUEST':
      const quests = [...state, action.payload.quest];
      return quests;
    case 'EDIT_QUEST': 
      const { id } = action.payload.quest;
      const targetIndex = state.findIndex(quest => quest.id === id);
      const workingQuests = [...state];
      const updatedQuests = workingQuests.splice(
        targetIndex,
        1,
        action.payload.quest
      );
      return updatedQuests;
    default:
      return state;
  }
};
