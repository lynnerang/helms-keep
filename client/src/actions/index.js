export const storeQuests = quests => ({
  type: 'STORE_QUESTS',
  payload: {
    quests
  }
})

export const addQuest = quest => ({
  type: 'ADD_QUEST',
  payload: {
    quest
  }
})