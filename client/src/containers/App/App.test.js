import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps } from './App';
import { mockQuest } from '../../api/utilities';
import { fetchAllQuests } from '../../api/fetch/fetchAllQuests';

jest.mock('../../api/fetch/fetchAllQuests');

describe('App', () => {
  let wrapper;
  const mockStoreQuests = jest.fn();

  fetchAllQuests.mockImplementation(() => Promise.resolve([mockQuest, mockQuest]));
  beforeEach(() => {
    wrapper = shallow(
      <App 
        quests={[mockQuest, mockQuest]} 
        storeQuests={mockStoreQuests}
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('CDM', () => {
    it('should call fetchAllQuests if there are no quests', () => {
      wrapper = shallow(<App quests={[]} storeQuests={mockStoreQuests} />);
      expect(fetchAllQuests).toHaveBeenCalled();
    });

    it('should call storeQuests once resolve', async () => {
      wrapper = shallow(<App quests={[]} storeQuests={mockStoreQuests} />);
      await wrapper.instance().componentDidMount()
      expect(mockStoreQuests).toHaveBeenCalledWith([mockQuest, mockQuest])
    });
  });

  describe('mapStateToProps', () => {
    it('should return an away of quests', () => {
      const state = { quests: [mockQuest, mockQuest], test: 'test' };
      const expected = { quests: [mockQuest, mockQuest] };
      const result = mapStateToProps(state);
      expect(result).toEqual(expected);
    });
  });

  // describe('mapDispatchToProps', () => {
  //   it('should call dispatch when storeQuests is called', () => {
  //     const 
  //   });
  // });
});