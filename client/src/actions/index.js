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

export const editQuest = quest => {
  return {
    type: "EDIT_QUEST",
    payload: {
      quest
    }
  };
}

export const showPopup = bool => {
  return {
    type: "SHOW_POPUP",
    payload: {
      bool
    }
  }
}