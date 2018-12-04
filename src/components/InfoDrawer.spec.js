import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from '@material-ui/core/Button';
import InfoDrawer from './InfoDrawer';

describe('InfoDrawer', () => {
  it('should display without errors', () => {
    // not including SAT scores
    const mockHighSchool = {
      dbn: '01',
      school_name: 'test name',
      location: '5th Ave',
      phone_number: '718-123-1234',
      total_students: '100',
    };

    const infoDrawer = shallow(<InfoDrawer highSchool={mockHighSchool} />);

    expect(infoDrawer.html()).toContain('01');
    expect(infoDrawer.html()).toContain('test name');
    expect(infoDrawer.html()).toContain('test name');

    expect(infoDrawer.html()).toContain('Add to compare');
  });

  it('should have the Add to compare button working', () => {
    // not including SAT scores
    const mockHighSchool = {
      dbn: '01',
      school_name: 'test name',
      location: '5th Ave',
      phone_number: '718-123-1234',
      total_students: '100',
    };

    const infoDrawer = mount(<InfoDrawer highSchool={mockHighSchool} />);

    // clicking the button executes the correct handler
    expect(infoDrawer.find(Button).text()).toBe('Add to compare');
    expect(mockHighSchool.isAddedToCompare).not.toBeDefined();
    // ^ initially undefined

    // removing from the list of schools to compare behaves correctly
    infoDrawer.find(Button).simulate('click');
    expect(mockHighSchool.isAddedToCompare).toBe(true);
    infoDrawer.unmount();
    infoDrawer.mount();
    expect(infoDrawer.find(Button).text()).toBe('Remove from compare');

    // and clicking again does not remove the isAddedToCompare property
    infoDrawer.find(Button).simulate('click');
    infoDrawer.unmount();
    infoDrawer.mount();
    expect(infoDrawer.find(Button).text()).toBe('Add to compare');
    expect(mockHighSchool.isAddedToCompare).toBe(false);
  });
});
