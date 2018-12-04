import React, { PureComponent } from 'react';

import { HighSchoolDataConsumer } from '../components/contexts/HighSchoolData';
import SchoolList from '../components/SchoolList';

class ListingPage extends PureComponent {
  render() {
    return (
      <HighSchoolDataConsumer>
        {({ highSchools }) => <SchoolList highSchools={highSchools} />}
      </HighSchoolDataConsumer>
    );
  }
}

export default ListingPage;
