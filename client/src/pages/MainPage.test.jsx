import React from 'react';

import {useDispatch, useSelector} from 'react-redux';

import { render, fireEvent } from '@testing-library/react'

import MainPage from './MainPage';

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
      const { container } = render(
        <MainPage />
      );

      expect(container).toHaveTextContent('로그인 중');
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
        <MainPage />
      );

      expect(container).toHaveTextContent('옵션');
    });
  });

  context('when click login', () =>{
    it('dispatches action', () =>{
      const { getByText } = render(
        <MainPage />
      );

      fireEvent.click(getByText('login'));

      expect(dispatch).toBeCalled();
    })
  })
})
