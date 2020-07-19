const options = {
  '25분': 25 * 60 * 1000,
  '50분': 10 * 1000,
};

const convertToMilliSeconds = (timeOption) => options[timeOption];

export default convertToMilliSeconds;
