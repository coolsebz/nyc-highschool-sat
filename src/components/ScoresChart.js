import React, { PureComponent, Fragment } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class ScoresChart extends PureComponent {

  computeChartData(selectedSchools) {
    if(!selectedSchools || selectedSchools === {}) return [];

    const chartData = [];
    Object.entries(selectedSchools).forEach(([dbn, school]) => {
      chartData.push({
        name: school.school_name,
        avgReadingScore: school.sat_critical_reading_avg_score,
        avgMathScore: school.sat_math_avg_score,
        avgWritingScore: school.sat_writing_avg_score,
      })
    });

    return chartData;
  }

  render() {

    const data = this.computeChartData(this.props.selectedSchools);
    const isNoSchoolSelected = Object.keys(this.props.selectedSchools).length === 0;
    return (
      <Fragment>
        { isNoSchoolSelected ? (<div>You have no schools selected</div>) : '' }
        <ResponsiveContainer width='95%' height={430}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="avgReadingScore" fill="#1976d2" name="Average Reading Score" minPointSize={3}/>
            <Bar dataKey="avgMathScore" fill="#63a4ff" name="Averate Math Score" minPointSize={3}/>
            <Bar dataKey="avgWritingScore" fill="#004ba0" name="Averate Writing Score" minPointSize={3}/>
          </BarChart>
        </ResponsiveContainer>
      </Fragment>
    );
  }
}

export default ScoresChart;
