import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SchoolListing from './SchoolListing';
import InfoDrawer from './InfoDrawer';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  moreInfoGrid: {
    position: 'relative',
  },
  moreInfo: {
    position: 'fixed',
    marginRight: '32px',
  },
});

class SchoolList extends Component {
  constructor() {
    super();

    this.state = {
      selectedHighSchool: null,
    };

    this.selectHighSchool = this.selectHighSchool.bind(this);
    this.closeMoreInfo = this.closeMoreInfo.bind(this);
  }

  selectHighSchool(selectedHighSchool) {
    this.setState({
      selectedHighSchool,
    });
  }

  closeMoreInfo() {
    this.setState({
      // note(seb): i know this is a topic for debate, have no strong opinion but
      //            using `null` here since `undefined` is the value that a variable gets
      //            before any value has been assigned to it
      selectedHighSchool: null,
    });
  }

  render() {
    const { highSchools = [] } = this.props;

    return (
      <Grid container className={this.props.classes.root} spacing={16}>
        <Grid item xs={12} sm={12} lg={this.state.selectedHighSchool ? 9 : 12}>
          <Grid
            style={{ overflow: 'auto' }}
            container
            wrap="wrap"
            justify="center"
            spacing={16}
          >
            {highSchools.map((highSchool, i) => (
              <Grid key={i} xs={12} sm={12} md={4} xl={3} item>
                <SchoolListing
                  highSchool={highSchool}
                  onMoreInfo={this.selectHighSchool}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {this.state.selectedHighSchool ? (
          <Grid
            className={this.props.classes.moreInfoGrid}
            item
            xs={12}
            sm={12}
            md={3}
            xl={3}
          >
            <InfoDrawer
              className={this.props.classes.moreInfo}
              highSchool={this.state.selectedHighSchool}
              onClose={this.state.closeMoreInfo}
            />
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    );
  }
}

// note(seb): i generally prefer render props as a pattern but this is how this
//            particular ui toolkit is used
export default withStyles(styles)(SchoolList);
