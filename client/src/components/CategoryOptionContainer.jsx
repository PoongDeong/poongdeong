import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Select from './Select';

import { setCategoryOption } from '../slice';

export default function CategoryOptionContainer() {
  const dispatch = useDispatch();
  const categoryOption = useSelector((state) => state.categoryOption);

  const options = ['공부', '코딩', '독서'];

  const handleClick = (option) => {
    dispatch(setCategoryOption(option));
  };

  return (
    <Select
      selectedValue={categoryOption}
      options={options}
      onClick={handleClick}
    />
  );
}
