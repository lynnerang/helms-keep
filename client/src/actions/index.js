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

export const deleteQuest = id => {
  return {
    type: "DELETE_QUEST",
    payload: {
      id
    }
  };
}

export const showPopup = (bool, id, type) => {
  return {
    type: "SHOW_POPUP",
    payload: {
      bool,
      id,
      type
    }
  };
}

export const addExp = (exp) => {
  return {
    type: 'ADD_EXP',
    payload: {
      exp
    }
  }
}
export const addLvl = (lvl) => {
  return {
    type: 'ADD_LVL',
    payload: {
      lvl
    }
  }
}
export const addNextLvl = (lvl) => {
  return {
    type: 'ADD_NEXT_LVL',
    payload: {
      lvl
    }
  }
}