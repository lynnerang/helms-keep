import React from 'react';
import { shallow } from 'enzyme';
import { Quest, mapDispatchToProps } from './Quest';
import { mockQuest, mockCompletedTask, mockTask } from '../../api/utilities';
import { fetchEditQuest } from '../../api/fetch/fetchEditQuest';
import { editQuest, showPopup } from '../../actions';

jest.mock('../../api/fetch/fetchEditQuest');

describe('Quest', () => {
	let wrapper, instance;

	const mockShowPopUp = jest.fn();
	const mockUpdateQuest = jest.fn();
	const mockKeyEvent = {
		key: 'Enter',
		preventDefault: () => {},
		target: {
			innerText: 'New title',
			blur: jest.fn()
		}
	};
	const mockBlurEvent = {
		type: 'blur',
		preventDefault: () => {},
		target: {
			innerText: 'New title',
			blur: jest.fn()
		}
	}

	beforeEach(() => {
		const mockQuest = {
			id: '1234',
			title: 'My First Quest',
			color: "green",
			challenges: [mockTask, mockCompletedTask]
		}
		wrapper = shallow(
		<Quest 
			data={mockQuest} 
			showPopup={mockShowPopUp}
			updateQuest={mockUpdateQuest}
		/>);
		instance = wrapper.instance();
	});

	it('should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should have a default state', () => {
		const defaultState = {
			showCompleted: false,
			showColors: false
		};
		expect(wrapper.state()).toEqual(defaultState);
	});

	describe('Event Handlers', () => {
		it('should invoke toggleShowCompleted on click', () => {
			expect(wrapper.state('showCompleted')).toEqual(false);
			wrapper.find('.show-completed').simulate('click');
			expect(wrapper.state('showCompleted')).toEqual(true);
		});

		it('should invoke updateTitle when the title is edited', () => {
			jest.spyOn(instance, 'updateTitle');
			wrapper.find('.card-title').simulate('keydown', mockKeyEvent);
			expect(mockKeyEvent.target.blur).toHaveBeenCalled();
		});

		it('should invoke updateTitle when the title is blured', () => {
			jest.spyOn(instance, 'updateTitle');
			wrapper.find('.card-title').simulate('blur', mockBlurEvent);
			expect(mockKeyEvent.target.blur).toHaveBeenCalled();
		});

		it('should invoke showDeleteWarning when the delete button is clicked', () => {
			wrapper.find('.fa-trash').simulate('click');
			expect(mockShowPopUp).toHaveBeenCalledWith(true, '1234', 'delete')
		});
	});

	describe('toggleShowCompleted', () => {
		it('should toggle the showCompleted property in state', () => {
			expect(wrapper.state('showCompleted')).toEqual(false);
			instance.toggleShowCompleted();
			expect(wrapper.state('showCompleted')).toEqual(true);
			instance.toggleShowCompleted();
			expect(wrapper.state('showCompleted')).toEqual(false);
		});
	});

	describe('addChallenge', () => {
		it('should add a challenge to the challenges array of quest', () => {
			expect(instance.props.data.challenges).toHaveLength(2);
			instance.addChallenge(mockTask);
			expect(instance.props.data.challenges).toHaveLength(3);
		});

		it('should invoke updateQuest with the the new quest data', () => {
			jest.spyOn(instance, 'updateQuest');
			instance.addChallenge(mockTask);
			let localNote = { ...instance.props.data}
			localNote.challenges.push(mockTask);
			expect(instance.updateQuest).toHaveBeenCalledWith(localNote);
		});
	});

	describe('deleteChallenge', () => {
		it('should remove the appropriate challenge from the quest data', () => {
			expect(instance.props.data.challenges).toHaveLength(2);
			instance.deleteChallenge(5678);
			expect(instance.props.data.challenges).toHaveLength(1);
		});

		it('should invoke updateQuest with the the new quest data', () => {
			jest.spyOn(instance, 'updateQuest');
			instance.deleteChallenge(1234);
			let localNote = { ...instance.props.data }
			localNote.challenges.pop();
			expect(instance.updateQuest).toHaveBeenCalledWith(localNote);
		});
	});

	describe('updateChallenge', () => {
		let localChallenge = {
			id: '1234',
			isCompleted: false,
			message: 'update todo list'
		}
		it('should reassign the appropriate challenge', () => {
			instance.updateChallenge(localChallenge);
			expect(instance.props.data.challenges).toEqual([localChallenge, mockCompletedTask])
		});

		it('should invoke updateQuest with the update quest data', () => {
			jest.spyOn(instance, 'updateQuest');
			let localNote = { ...instance.props.data };
			localNote.challenges[0] = localChallenge;
			instance.updateChallenge(localChallenge);
			expect(instance.updateQuest).toHaveBeenCalledWith(localNote);
		});
	});

	describe('showDeleteWarning', () => {
		it('should invoke showPopup with the correct params', () => {
			instance.showDeleteWarning();
			expect(mockShowPopUp).toHaveBeenCalledWith(true, '1234', 'delete');
		});
	});

	describe('updateQuest', () => {
		it('should invoke the updateQuest dispatch with the correct params', () => {
			instance.updateQuest(mockQuest);
			expect(mockUpdateQuest).toHaveBeenCalledWith(mockQuest);
		});

		it('should invoke the fetchEditQuest dispatch with the correct params', () => {
			instance.updateQuest(mockQuest);
			expect(fetchEditQuest).toHaveBeenCalledWith(mockQuest);
		});
	});

	describe('updateTitle', () => {
		let updatedNote = { ...mockQuest, title: 'New title'};

		it('should invoke updateQuest if the user presses enter', () => {
			jest.spyOn(instance, 'updateQuest');
			instance.updateTitle(mockKeyEvent);
			expect(instance.updateQuest).toHaveBeenCalledWith(updatedNote);
		});

		it('should invoke updateQuest if the title blurs', () => {
			jest.spyOn(instance, 'updateQuest');
			instance.updateTitle(mockBlurEvent);
			expect(instance.updateQuest).toHaveBeenCalledWith(updatedNote);
		});

		it('should not invoke updateQuest if the condition is not met', () => {
			jest.spyOn(instance, 'updateQuest');
			instance.updateTitle({});
			expect(instance.updateQuest).not.toHaveBeenCalledWith();
		});
	});

	describe('MDTP', () => {
		let mappedProps, mockDispatch;
		beforeEach(() => {
			mockDispatch = jest.fn();
			mappedProps = mapDispatchToProps(mockDispatch);
		});

		it('should call dispatch when updateQuest is called', () => {
			const actionToDispatch = editQuest(mockQuest);
			mappedProps.updateQuest(mockQuest);
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
		});

		it('should call dispatch when showPopup is called', () => {
			const actionToDispatch = showPopup(true, 1, 'delete');
			mappedProps.showPopup(true, 1, 'delete');
			expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
		});
	});
});
