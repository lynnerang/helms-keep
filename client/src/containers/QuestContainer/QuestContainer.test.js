import React from 'react';
import { shallow } from 'enzyme';
import { QuestContainer } from './QuestContainer';

describe('QuestContainer', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<QuestContainer />);
	});

	it('should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
