import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppRouter';

// mocking this since with create react app the tests are not using
// the loader that we need ('worker-loader')
jest.mock('./data/DataAggregator.worker', () => {
  return jest.fn().mockImplementation(() => {
    return {
      addEventListener: jest.fn(),
      postMessage: jest.fn(),
    };
  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
