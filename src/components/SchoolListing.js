import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { SchoolCompareConsumer } from './contexts/SchoolCompare';

class SchoolListing extends PureComponent {
  render() {

    // other details i've considered: phone number? listing the avg score directly on the tile?
    const { school_name, city, neighborhood, dbn, num_of_sat_test_takers } = this.props.highSchool;
    const { onMoreInfo } = this.props;

    const moreInfo = () => {
      onMoreInfo(this.props.highSchool);
    }

    const addToCompare = (addSchool) => {
      this.props.highSchool.isAddedToCompare = true;
      addSchool(this.props.highSchool)
    }

    const removeFromCompare = (removeSchool) => {
      this.props.highSchool.isAddedToCompare = false;
      removeSchool(this.props.highSchool)
    }

    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            { dbn }
          </Typography>
          <Typography noWrap variant="h5" component="h2">
            { school_name }
          </Typography>
          <Typography noWrap color="textSecondary" gutterBottom>
            { `${city}, ${neighborhood}` }
          </Typography>
          <br/>
          <Typography variant="body1" component="p">
            { `${num_of_sat_test_takers} students have taken the SAT` }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={moreInfo}>More info</Button>

          <SchoolCompareConsumer>
            {({addSchool, removeSchool}) => (
              this.props.highSchool.isAddedToCompare ?
              (<Button size="small" onClick={() => removeFromCompare(removeSchool)}>Remove from compare</Button>) :
              (<Button size="small" onClick={() => addToCompare(addSchool)}>Add to compare</Button>)
            )}
          </SchoolCompareConsumer>
        </CardActions>
      </Card>
    );
  }
}

SchoolListing.propTypes = {
  classes: PropTypes.object.isRequired,
  highSchool: PropTypes.object.isRequired,
};

SchoolListing.defaultProps = {
  classes: {},
  highSchool: {},
};

export default SchoolListing;

