import convertToMilliSeconds from './time-option.service';

describe('convertToMilliSeconds', () => {
  it('returns milliseconds', () => {
    const milliseconds = convertToMilliSeconds('25분');

    expect(milliseconds).toBe(25 * 60 * 1000);
  });
});
