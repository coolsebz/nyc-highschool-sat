import React, { Component } from 'react';

const SchoolCompareContext = React.createContext({
  // note(seb): this is where we hold the raw information provided to us
  selectedSchools: {},
  addSchool: highSchool => null,
  removeSchool: highSchool => null,
  isSelected: highSchool => null,
});

export const SchoolCompareConsumer = SchoolCompareContext.Consumer;

export class SchoolCompareProvider extends Component {
  state = {
    selectedSchools: {},
  };

  addSchool = highSchool => {
    if (!highSchool || !highSchool.dbn) return;

    const newSelectedSchools = this.state.selectedSchools;
    newSelectedSchools[highSchool.dbn] = highSchool;

    this.setState({
      selectedSchools: newSelectedSchools,
    });
  };

  removeSchool = highSchool => {
    if (!highSchool || !highSchool.dbn) return;

    // creating a new object from `selectedSchools` that does not contain the highschool
    //   passed as a parameter to this function
    const {
      [highSchool.dbn]: value,
      ...selectedSchools
    } = this.state.selectedSchools;
    this.setState({
      selectedSchools,
    });
  };

  isSelected = highSchool => {
    console.log('called');
    // reasoning: if it can't be added to the list, it can't be selected
    if (!highSchool || !highSchool.dbn) return false;

    // !! is used to coerce the result (undefined or an object, even if empty)
    //   to true / false values
    return !!this.state.selectedSchools[highSchool.dbn];
  };

  render() {
    return (
      <SchoolCompareContext.Provider
        value={{
          selectedSchools: this.state.selectedSchools,
          addSchool: this.addSchool,
          removeSchool: this.removeSchool,
          isSelected: this.isSelected,
        }}
      >
        {this.props.children}
      </SchoolCompareContext.Provider>
    );
  }
}
