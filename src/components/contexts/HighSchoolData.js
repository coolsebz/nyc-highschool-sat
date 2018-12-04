import React, { Component } from 'react';
import DataAggregator from '../../data/DataAggregator.worker';

const HighSchoolDataContext = React.createContext({
  highSchools: [],
});

export const HighSchoolDataConsumer = HighSchoolDataContext.Consumer;

export class HighSchoolDataProvider extends Component {
  constructor(props) {
    super(props);

    const highSchools = this.fetchHighSchoolData();

    this.state = {
      highSchools,
    };
  }

  fetchHighSchoolData() {
    this.worker = new DataAggregator();

    this.worker.addEventListener('message', event => {
      const highSchools = event.data;
      this.setState({
        highSchools,
      });
    });

    // Treating it as close to a fetch as possible
    this.worker.postMessage('Fetch HighSchools');
    // note(seb): ^ the message doesn't really matter as
    //            we're not checking for its content
  }

  render() {
    return (
      <HighSchoolDataContext.Provider
        value={{
          highSchools: this.state.highSchools,
        }}
      >
        {this.props.children}
      </HighSchoolDataContext.Provider>
    );
  }
}
