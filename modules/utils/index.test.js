import { isEmpty, generateRandomID } from './index';

// const generateRandomID = () => Math.random().toString(20).substr(2, 12);
// const isEmpty = (str) => (!str || str === undefined || str.length === 0 || !/\S/.test(str));
describe('test suite of utils', () => {
  test('isEmpty', () => {
    const empty = ''
    expect(isEmpty(empty)).toBeTruthy();
  });

  test('generateRandomID', () => {
    const randomId = generateRandomID()
    expect(randomId).toHaveLength(12)
  });
});

