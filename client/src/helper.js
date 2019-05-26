export const searchQuests = (searchQuery, quests) => {
  let query = searchQuery.toLowerCase();
  let results = []; 
  quests.forEach(quest => {
    let challenges = quest.challenges.map(challenge => challenge.message.toLowerCase());
    if (quest.title.toLowerCase().includes(query) || challenges.some(challenge => challenge.includes(query))) {
      results.push(quest.id);
    }
  });
  return results
}