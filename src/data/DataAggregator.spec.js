import { aggregator } from './DataAggregator.worker';

describe('DataAggregator happy cases', () => {
  it('should return the list of highschools correctly aggregated with sat scores', () => {
    const highSchoolsMock = [
      {
        school_name: 'Test High',
        dbn: '01',
      },
    ];

    const satScoresMock = [
      {
        dbn: '01',
        num_of_sat_test_takers: '10',
        sat_critical_reading_avg_score: '500',
        sat_math_avg_score: '500',
        sat_writing_avg_score: '500',
      },
    ];

    const result = aggregator(highSchoolsMock, satScoresMock);

    expect(result[0].num_of_sat_test_takers).toBe('10');
    expect(result[0].sat_critical_reading_avg_score).toBe('500');
    expect(result[0].sat_math_avg_score).toBe('500');
    expect(result[0].sat_writing_avg_score).toBe('500');
    expect(result[0].school_name).toBe('Test High');
  });
});

describe('DataAggregator edge cases', () => {
  const highSchoolsMock = [
    {
      school_name: 'Test High',
      dbn: '01',
    },
  ];

  const satScoresMock = [
    {
      dbn: '01',
      num_of_sat_test_takers: 's',
      sat_critical_reading_avg_score: 's',
      sat_math_avg_score: 's',
      sat_writing_avg_score: 's',
    },
  ];

  it("should return N/A if the sat scores are 's'", () => {
    const result = aggregator(highSchoolsMock, satScoresMock);

    expect(result[0].num_of_sat_test_takers).toBe('N/A');
    expect(result[0].sat_critical_reading_avg_score).toBe('N/A');
    expect(result[0].sat_math_avg_score).toBe('N/A');
    expect(result[0].sat_writing_avg_score).toBe('N/A');
    expect(result[0].school_name).toBe('Test High');
  });

  it('should return N/A if there are no matches for the highschool', () => {
    // passing in an empty array with no scores
    const result = aggregator(highSchoolsMock, []);

    expect(result[0].num_of_sat_test_takers).toBe('N/A');
    expect(result[0].sat_critical_reading_avg_score).toBe('N/A');
    expect(result[0].sat_math_avg_score).toBe('N/A');
    expect(result[0].sat_writing_avg_score).toBe('N/A');
    expect(result[0].school_name).toBe('Test High');
  });
});
