import HighSchools from './highschools.json';
import SatScores from './sat-scores.json';

// note(seb): quite a naive way of searching through the list of sat scores, so some disclaimers
//      - in a real production env I would have this list somewhere, indexed by the `dbn` value
//      - if really necessary to keep this in JS, I would transform it in an object so that I can use
//          the `dbn` as they key (eg: `transformedSats[dbn]` returns all the information
//      - even here, i can see that the list is ordered so i could be smart and apply binary search or
//          something like KMP but decided to go with the most readable solution for now:
const getScoresByDbn = (satScores, dbn) => {
  return satScores.find(schoolScore => schoolScore.dbn === dbn) || {};
};

// note(seb): separated the aggregator logic into a function that takes highschools and scores so that
//            tests can be written that are only concerned with the logic, although in production,
//            i would probably try to spend a bit more time and find a way to mock the whole worker interface
export const aggregator = (highSchools, satScores) => {
  const highSchoolsWithSats = highSchools.map(highSchool => {
    const schoolScores = getScoresByDbn(satScores, highSchool.dbn);

    // `let` and not `const` because in the next block i end up changing some values
    let {
      num_of_sat_test_takers = 'N/A',
      sat_critical_reading_avg_score = 'N/A',
      sat_math_avg_score = 'N/A',
      sat_writing_avg_score = 'N/A',
    } = schoolScores;

    // crude solution but some schools have `s` as their entry, and here I'm "cleaning up" the data
    if (num_of_sat_test_takers === 's') num_of_sat_test_takers = 'N/A';
    if (sat_critical_reading_avg_score === 's')
      sat_critical_reading_avg_score = 'N/A';
    if (sat_math_avg_score === 's') sat_math_avg_score = 'N/A';
    if (sat_writing_avg_score === 's') sat_writing_avg_score = 'N/A';

    return {
      num_of_sat_test_takers,
      sat_critical_reading_avg_score,
      sat_math_avg_score,
      sat_writing_avg_score,
      ...highSchool,
    };
  });

  return highSchoolsWithSats;
};

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', e => {
  if (!e) return;
  postMessage(aggregator(HighSchools, SatScores));
});
