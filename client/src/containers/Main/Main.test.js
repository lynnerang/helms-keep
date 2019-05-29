import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../Main/Main';
import * as helper from '../../helper';
import { mapStateToProps, mapDispatchToProps } from './Main';
import { addQuest } from '../../actions';

describe('Main', () => {
  let wrapper;
  const mockQuest = [
    { id: 3, title: 'My first quest', challenges: ['hi', 'there'] }
  ];
	const mockQuests = [
		{ id: 1, title: 'My first quest', challenges: [ 'hi', 'there' ] },
		{ id: 2, title: 'My second quest', challenges: [ 'beef', 'cake' ] }
	];
	const mockAddQuest = jest.fn();
	const mockEvent = {
		target: { value: 'beef' },
		preventDefault: jest.fn()
	};

	helper.searchQuests = jest.fn().mockImplementation(() => mockQuests);

	beforeEach(() => {
		wrapper = shallow(<Main popup={false} quests={mockQuests} addQuest={mockAddQuest} />);
	});

	it('should match the snapshot when the store prop popup is false', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should match the snapshot when the store prop popup is true', () => {
		wrapper = shallow(<Main popup={true} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should have the appropriate default state', () => {
		expect(wrapper.state()).toEqual({
			query: '',
			results: null
		});
	});

	it('should update state when handleChange is invoked and the input has a value', () => {
		expect(wrapper.state('query')).toEqual('');

		wrapper.instance().handleChange(mockEvent);

		expect(wrapper.state('query')).toEqual('beef');
	});

	it('should update query state when handleChange is invoked and the event target has no value', () => {
		const mockEmptyEvent = { target: { value: '' } };

		wrapper.instance().handleChange(mockEvent);

		expect(wrapper.state('query')).toEqual('beef');

		wrapper.instance().handleChange(mockEmptyEvent);

		expect(wrapper.state('query')).toEqual('');
	});

	it('should call searchQuests when handleSubmit is invoked', () => {
		wrapper.instance().handleSubmit(mockEvent);

		expect(helper.searchQuests).toHaveBeenCalled();
	});

	it('should update results state with the results if they exist when handleSubmit is invoked', () => {
		expect(wrapper.state('results')).toEqual(null);

		wrapper.instance().handleSubmit(mockEvent);

		expect(wrapper.state('results')).toEqual(mockQuests);
	});

	it('should update results state to null when handleChange is invoked and there is no event target value', () => {
		const mockEmptyEvent = { target: { value: '' } };

		wrapper.instance().handleSubmit(mockEvent);

		expect(wrapper.state('results')).toEqual(mockQuests);

		wrapper.instance().handleChange(mockEmptyEvent);

		expect(wrapper.state('results')).toEqual(null);
	});

	it('should update the results state to null when clearResults is invoked', () => {
		wrapper.instance().handleSubmit(mockEvent);

		expect(wrapper.state('results')).toEqual(mockQuests);

		wrapper.instance().clearResults();

		expect(wrapper.state('results')).toEqual(null);
	});

	describe('Main event listeners', () => {
		it('should call handleChange when the input value changes', () => {
			jest.spyOn(wrapper.instance(), 'handleChange');

			wrapper.find('.search-input').simulate('change', mockEvent);

			expect(wrapper.instance().handleChange).toHaveBeenCalled();
    });
    
    it('should call handleSubmit when the input value changes', () => {
      // jest.spyOn(wrapper.instance(), 'handleSubmit');
      wrapper.instance().handleSubmit = jest.fn();

      wrapper.find('.search-bar').simulate('onSubmit', mockEvent);

      expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
    });
  });
  
  describe('mapStateToProps', () => {
    it('should return an object with popup and quests data', () => {
      const expected = { popup: false, quests: mockQuests };

      const mappedProps = mapStateToProps({ popup: false, quests: mockQuests });

      expect(mappedProps).toEqual(expected);
    });
  })

  describe('mapDispatchToProps', () => {
    it('calls dispatch with an addQuests action when login is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = addQuest(mockQuest);
      const mappedProps = mapDispatchToProps(mockDispatch);

      mappedProps.addQuest(mockQuest);

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
