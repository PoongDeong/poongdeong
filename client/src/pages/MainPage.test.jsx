import React from 'react';

import {useDispatch, useSelector} from 'react-redux';

import { render, fireEvent } from '@testing-library/react'

import MainPage from './MainPage';
import {MemoryRouter} from "react-router";

jest.mock('react-redux');

describe('MainPage', () =>{
  const dispatch = jest.fn();

  beforeEach(() =>{
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
  })

  context('when logout', () =>{
    beforeEach(() =>{
      useSelector.mockImplementation((selector) => selector({
        isLogin: false,
      }))
    })

    it('renders MainPage', () =>{
      const { container, getByText } = render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      );

      expect(getByText('회원가입')).toBeInTheDocument();
    });
  });

  context('when logined', () =>{
    beforeEach(() =>{
      useSelector.mockImplementation((selector) => selector({
        isLogin: true,
      }))
    })

    it('renders MainPage', () =>{
      const { container } = render(
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      );

      expect(container).toHaveTextContent('옵션');
    });
  });
})
