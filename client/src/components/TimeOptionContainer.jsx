import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Select from './Select';

import { setTimeOption } from '../slice';

export default function TimeOptionContainer() {
  const dispatch = useDispatch();
  const timeOption = useSelector((state) => state.timeOption);

  const options = ['25분', '50분'];

  const handleClick = (option) => {
    dispatch(setTimeOption(option));
  };

  return (
    <Select
      selectedValue={timeOption}
      options={options}
      onClick={handleClick}
    />
  );
}
