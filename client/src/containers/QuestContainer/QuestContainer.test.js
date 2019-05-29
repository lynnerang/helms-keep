import React from 'react';
import { shallow } from 'enzyme';
import { QuestContainer, mapStateToProps } from './QuestContainer';
import { mockQuest } from '../../api/utilities';

describe('QuestContainer', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(
		<QuestContainer 
			quests={[mockQuest, mockQuest]}
			results={null}
		/>);
	});

	it('should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should match snapshot with results', () => {
		wrapper = shallow(
			<QuestContainer
				quests={[mockQuest, mockQuest]}
				results={['1234']}
			/>);
		expect(wrapper).toMatchSnapshot();
	});

	describe('MSTP', () => {
		it('should return an array of quests', () => {
			const state = { quests: [mockQuest, mockQuest], test: 'test' }
			const expected = { quests: [mockQuest, mockQuest] }
			const result = mapStateToProps(state);
			expect(result).toEqual(expected);
		});
	});
});
