export const host = 'http://localhost:5000/api/';

export const mockTask = {
  id: '1234',
  isCompleted: false, 
  message: 'Clean the kitchen'
};

export const mockCompletedTask = {
  id: '5678',
  isCompleted: true,
  message: 'Make a mock completed task'
}

export const mockQuest = {
	id: '1234',
  title: 'My First Quest',
  color: "green",
	challenges: [ mockTask, mockCompletedTask ]
};

export const mockUser = { exp: 0, lvl: 1, nextLvl: 100, name: 'Jacob' };
