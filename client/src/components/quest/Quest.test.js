import React from './node_modules/react';
import { shallow } from './node_modules/ enzyme';
import Quest from './Quest';
import { mockNote } from '../../api/utilities';

describe('Quest', () => {
	let wrapper, instance;

	beforeEach(() => {
		wrapper = shallow(<Quest data={mockNote} />);
		instance = wrapper.instance();
	});

	it('should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should have a default state', () => {
		const defaultState = { showCompleted: false };
		expect(wrapper.state()).toEqual(defaultState);
	});

	describe('Event Handlers', () => {
		it('should invoke toggleShowCompleted on click', () => {
			expect(wrapper.state('showCompleted')).toEqual(false);
			wrapper.find('.showCompleted').simulate('click');
			expect(wrapper.state('showCompleted')).toEqual(true);
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
});
