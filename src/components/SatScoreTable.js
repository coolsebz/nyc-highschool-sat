import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class SatScoreTable extends PureComponent {
  prepareData(readingScore, mathScore, writingScore) {
    return [
      {
        label: 'Critical Reading',
        score: readingScore,
      },
      {
        label: 'Math',
        score: mathScore,
      },
      {
        label: 'Writing',
        score: writingScore,
      },
    ];
  }

  render() {
    const {
      readingScore = 'N/A',
      mathScore = 'N/A',
      writingScore = 'N/A',
    } = this.props;

    const scoreList = this.prepareData(readingScore, mathScore, writingScore);

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject Name</TableCell>
            <TableCell numeric>Average Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreList.map((row, i) => {
            return (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell numeric>{row.score}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

SatScoreTable.propTypes = {
  readingScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  mathScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  writingScore: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

SatScoreTable.defaultProps = {
  readingScore: 'N/A',
  mathScore: 'N/A',
  writingScore: 'N/A',
};

export default SatScoreTable;
