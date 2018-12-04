import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import { SchoolCompareProvider } from './components/contexts/SchoolCompare';
import { HighSchoolDataProvider } from './components/contexts/HighSchoolData';
import ListingPage from './pages/ListingPage';
import ComparePage from './pages/ComparePage';

const AppRouter = () => {
  return (
    <Router>
      <HighSchoolDataProvider>
        <SchoolCompareProvider>
          <App>
            <Route exact path="/" component={ListingPage} />
            <Route path="/compare" component={ComparePage} />
          </App>
        </SchoolCompareProvider>
      </HighSchoolDataProvider>
    </Router>
  );
};

export default AppRouter;
