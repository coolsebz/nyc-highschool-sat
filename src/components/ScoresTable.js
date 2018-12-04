import React, { PureComponent } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class ScoresTable extends PureComponent {
  render() {
    const schoolData = [];

    // note(seb): this is really ugly, but to speed things up i chose to write a
    //            transformer here that is really similar to the one in ScoresChart,
    //            even though I probably could've found a prettier solution
    Object.entries(this.props.selectedSchools).forEach(([dbn, school]) => {
      schoolData.push({
        name: school.school_name,
        avgReadingScore: school.sat_critical_reading_avg_score,
        avgMathScore: school.sat_math_avg_score,
        avgWritingScore: school.sat_writing_avg_score,
      });
    });

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>High School Name</TableCell>
            <TableCell numeric>Average Reading Score</TableCell>
            <TableCell numeric>Average Math Score</TableCell>
            <TableCell numeric>Average Writing Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schoolData.map((school, i) => {
            return (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {school.name}
                </TableCell>
                <TableCell numeric>{school.avgReadingScore}</TableCell>
                <TableCell numeric>{school.avgMathScore}</TableCell>
                <TableCell numeric>{school.avgWritingScore}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default ScoresTable;
