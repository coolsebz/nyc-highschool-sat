import React, { PureComponent } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import SatScoreTable from './SatScoreTable';
import { SchoolCompareConsumer } from './contexts/SchoolCompare';

const InfoField = ({ fieldName, fieldValue = 'N/A' }) => (
  <div>
    <Typography color="textSecondary" variant="subtitle1">
      {fieldName}
    </Typography>
    <Typography nowrap="nowrap" variant="h6">
      {fieldValue}
    </Typography>
    <br />
  </div>
);

class InfoDrawer extends PureComponent {
  render() {
    const { highSchool } = this.props;

    const addToCompare = addSchool => {
      this.props.highSchool.isAddedToCompare = true;
      addSchool(highSchool);
    };

    const removeFromCompare = removeSchool => {
      this.props.highSchool.isAddedToCompare = false;
      removeSchool(highSchool);
    };

    // things I would've added and customised if I had more time:
    //
    // subway -> a nice component highlighting the colors of the lines
    //
    // busses -> chips with each bus line
    //
    // requirements -> listing nicely
    //
    // admission priorities -> this could expand into a whole new area
    //                         to compare between schools

    return (
      <Card className={this.props.className}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {highSchool.dbn}
          </Typography>
          <Typography variant="h5" component="h2">
            {highSchool.school_name}
          </Typography>

          <br />
          <hr />
          <br />

          <InfoField fieldName={'Address'} fieldValue={highSchool.location} />
          <InfoField fieldName={'Phone'} fieldValue={highSchool.phone_number} />
          <InfoField
            fieldName={'Website'}
            fieldValue={
              <a
                nowrap="nowrap"
                href={`https://${highSchool.website}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {highSchool.website}
              </a>
            }
          />

          <br />
          <hr />
          <br />

          <InfoField
            fieldName={'Total Students'}
            fieldValue={highSchool.total_students}
          />
          <InfoField
            fieldName={'# of students who took the SAT'}
            fieldValue={highSchool.num_of_sat_test_takers}
          />

          <SatScoreTable
            readingScore={highSchool.sat_critical_reading_avg_score}
            mathScore={highSchool.sat_math_avg_score}
            writingScore={highSchool.sat_writing_avg_score}
          />
        </CardContent>
        <CardActions>
          <SchoolCompareConsumer>
            {({ addSchool, removeSchool }) =>
              highSchool.isAddedToCompare ? (
                <Button
                  size="small"
                  onClick={() => removeFromCompare(removeSchool)}
                >
                  Remove from compare
                </Button>
              ) : (
                <Button size="small" onClick={() => addToCompare(addSchool)}>
                  Add to compare
                </Button>
              )
            }
          </SchoolCompareConsumer>
        </CardActions>
      </Card>
    );
  }
}

export default InfoDrawer;
