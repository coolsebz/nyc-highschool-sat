import React from 'react';
import { shallow, mount } from 'enzyme';
import TableCell from '@material-ui/core/TableCell';
import SatScoreTable from './SatScoreTable';

describe('SatScoreTable', () => {
  it('should display values correctly', () => {
    const mockScores = {
      readingScore: '100',
      mathScore: '200',
      writingScore: '300',
    };

    const satScoreTable = shallow(<SatScoreTable {...mockScores} />);

    expect(satScoreTable.find(TableCell).length).toEqual(8); // (headers + 3 rows) * 2 columns
    expect(satScoreTable.html()).toContain('100');
    expect(satScoreTable.html()).toContain('200');
    expect(satScoreTable.html()).toContain('300');
  });

  it('should display N/A if there are no values provided', () => {
    // no props passed
    const satScoreTable = mount(<SatScoreTable />);

    expect(satScoreTable.find(TableCell).length).toEqual(8); // still the same cell count
    satScoreTable.find('td').forEach(function(el) {
      expect(el.text()).toBe('N/A');
    });
  });
});
