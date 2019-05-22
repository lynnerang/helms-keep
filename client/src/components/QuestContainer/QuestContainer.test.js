import React from './node_modules/react';
import { shallow } from './node_modules/ enzyme';
import QuestContainer from './QuestContainer';

describe('QuestContainer', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<QuestContainer />);
	});

	it('should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});
});
