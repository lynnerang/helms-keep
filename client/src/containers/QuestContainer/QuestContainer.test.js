import React from 'react';
import { shallow } from 'enzyme';
import { QuestContainer, mapStateToProps } from './QuestContainer';
import { mockNote } from '../../api/utilities';

describe('QuestContainer', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(
		<QuestContainer 
			quests={[mockNote, mockNote]}
			results={null}
		/>);
	});

	it('should match snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should match snapshot with results', () => {
		wrapper = shallow(
			<QuestContainer
				quests={[mockNote, mockNote]}
				results={[1234]}
			/>);
		expect(wrapper).toMatchSnapshot();
	});

	describe('MSTP', () => {
		it('should return an array of quests', () => {
			const state = { quests: [mockNote, mockNote], test: 'test' }
			const expected = { quests: [mockNote, mockNote] }
			const result = mapStateToProps(state);
			expect(result).toEqual(expected);
		});
	});
});
