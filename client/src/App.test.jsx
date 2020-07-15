import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {useSelector} from "react-redux";

import { render, fireEvent, screen } from '@testing-library/react'

import App from './App';
import SignUpPage from "./pages/SignUpPage";

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
  });

  it('when click SignUpButton in LoginPage', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText("회원가입"));

    expect(screen.getByText("가입")).toBeInTheDocument();
  })
})
