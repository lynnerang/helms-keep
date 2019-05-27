import React from 'react';
import { shallow } from 'enzyme';
import ChallengeContainer from './ChallengeContainer';
import { mockTask } from '../../api/utilities';
import shortid from "shortid";

jest.mock("shortid");

describe('ChallengeContainer', () => {
  let wrapper, instance;

  const mockAddChallenge = jest.fn();
  const mockDeleteChallenge = jest.fn();
  const mockUpdateChallenge = jest.fn();
  const mockSaveChallenge = jest.fn();
  const mockChallenges=[mockTask, mockTask];
  const mockChallenge = { id: 1, isCompleted: false, message: "beef" };

  const mockSubmit = { preventDefault: () => {} }
  const mockChange = {
    target: {
      name: 'chalInput',
      value: 'beef'
    }
  }

  shortid.generate.mockImplementation(() => 1);

  beforeEach(() => {
    wrapper = shallow(
      <ChallengeContainer
        addChallenge={mockAddChallenge}
        challenges={mockChallenges}
        deleteChallenge={mockDeleteChallenge}
        saveChallenge={mockSaveChallenge}
        type="incomplete"
        updateChallenge={mockUpdateChallenge}
      />,
    );
    
    instance = wrapper.instance();

    instance.el = {
      scrollIntoView: jest.fn()
    }
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when type is complete', () => {
    wrapper = shallow(
      <ChallengeContainer
        challenges={mockChallenges}
        saveChallenge={mockSaveChallenge}
        type="complete"
      />,
      { disableLifecycleMethods: true }
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when type is form', () => {
    wrapper = shallow(
      <ChallengeContainer
        challenges={mockChallenges}
        saveChallenge={mockSaveChallenge}
        type="form"
      />,
      { disableLifecycleMethods: true }
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    const defaultState = {
      chalInput: ""
    };
    expect(wrapper.state()).toEqual(defaultState);
  });

  it('should invoke scrollToBottom on update', () => {
    jest.spyOn(instance, 'scrollToBottom');
    instance.componentDidUpdate();
    expect(instance.scrollToBottom).toHaveBeenCalled();
  });

  describe('Event Listeners', () => {
    it('should invoke handleSubmit on submit', () => {
      wrapper.find('.form-row').simulate('submit', mockSubmit);
      expect(mockAddChallenge).toHaveBeenCalled();
    });

    it("should invoke handleChange on input change", () => {
      wrapper.find(".new-challenge-input").simulate("change", mockChange);
      expect(wrapper.state('chalInput')).toEqual('beef');
    });
  });

  describe('scrollToBottom', () => {
    it('should invoke scrollIntoView when called', () => {
      instance.scrollToBottom();
      expect(instance.el.scrollIntoView).toHaveBeenCalled();
    });
  });

  describe('handleChange', () => {
    it('should change the appropriate state to the appropriate value', () => {
      instance.handleChange(mockChange);
      expect(wrapper.state('chalInput')).toEqual('beef');
    });
  });

  describe('handleSubmit', () => {
    it('should invoke addChallenge if type is incomplete', () => {
      instance.handleChange(mockChange);
      instance.handleSubmit(mockSubmit);
      expect(mockAddChallenge).toHaveBeenCalledWith(mockChallenge);
    });

    it("should invoke saveChallenge if type is not incomplete", () => {
      wrapper = shallow(
        <ChallengeContainer
          challenges={mockChallenges}
          saveChallenge={mockSaveChallenge}
          type="complete"
        />,
        { disableLifecycleMethods: true }
      );
      instance = wrapper.instance();
      instance.handleChange(mockChange);
      instance.handleSubmit(mockSubmit);
      expect(mockSaveChallenge).toHaveBeenCalledWith(mockChallenge);
    });

    it('should clear chalInput in state', () => {
      instance.handleChange(mockChange);
      expect(wrapper.state('chalInput')).toEqual('beef');
      instance.handleSubmit(mockSubmit);
      expect(wrapper.state("chalInput")).toEqual("");
    });
  });
});