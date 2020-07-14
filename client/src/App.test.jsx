import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {useSelector} from "react-redux";

import { render } from '@testing-library/react'

import App from './App';

jest.mock('react-redux');

describe('App', () =>{
  beforeEach(() =>{
    useSelector.mockImplementation((selector) => selector({
      isLogin: false,
    }))
  })

  it('renders App', () =>{
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  })
})
