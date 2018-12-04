import React, { PureComponent, Fragment } from 'react';
import { SchoolCompareConsumer } from '../components/contexts/SchoolCompare';
import ScoresChart from '../components/ScoresChart';
import ScoresTable from '../components/ScoresTable';

class ComparePage extends PureComponent {
  render() {
    return (
      <SchoolCompareConsumer>
        {({ selectedSchools }) => (
          <Fragment>
            <ScoresChart selectedSchools={selectedSchools} />
            <br />
            <ScoresTable selectedSchools={selectedSchools} />
          </Fragment>
        )}
      </SchoolCompareConsumer>
    );
  }
}

export default ComparePage;
