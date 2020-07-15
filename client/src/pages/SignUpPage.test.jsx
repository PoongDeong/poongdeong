import React from 'react';

import {useDispatch, useSelector} from 'react-redux';

import { render, fireEvent } from '@testing-library/react'

import SignUpPage from './SignUpPage';

jest.mock('react-redux');

describe('SignUpPage', () =>{
  it('renders SignUpPage', () => {
    render(
      <SignUpPage/>
    );
  });
})
