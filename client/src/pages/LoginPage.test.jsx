import React from 'react';

import { MemoryRouter} from "react-router";

import { render, fireEvent, screen } from '@testing-library/react';

import LoginPage from "./LoginPage";

describe('LoginPage', () =>{
  it('renders', ()=> {
    const { getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(getByText('회원가입')).toBeInTheDocument();
  });
})
