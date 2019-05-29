import React from 'react';
import { shallow } from 'enzyme';
import { Banner } from './Banner';
import { mockUser } from '../../api/utilities';

describe('Banner', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<Banner user={mockUser}/>);
    instance = wrapper.instance();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('selectAvatar', () => {
    it('should return elf as default', () => {
      const result = instance.selectAvatar();
      const expected = "elf_f_hit_anim_f0.png"
      expect(result).toEqual(expected);
    });

    it('should return knight if user level is between 5 and 9', () => {
      let lvl2User = Object.assign(mockUser, { lvl: 7 })
      wrapper = shallow(<Banner user={lvl2User} />);
      instance = wrapper.instance();
      const result = instance.selectAvatar();
      const expected = "knight_idle.png"
      expect(result).toEqual(expected);
    });

    it('should return centaur if user level is between 5 and 9', () => {
      let lvl2User = Object.assign(mockUser, { lvl: 12 })
      wrapper = shallow(<Banner user={lvl2User} />);
      instance = wrapper.instance();
      const result = instance.selectAvatar();
      const expected = "centaurlady.png"
      expect(result).toEqual(expected);
    });
  });


});