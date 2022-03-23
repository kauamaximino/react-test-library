import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente App', () => {
  it('Verifica se o topo da aplicação contém um conjunto fixo de links.',
    () => {
      renderWithRouter(<App />);

      const home = screen.getByText(/home/i);
      expect(home).toBeDefined();

      const about = screen.getByText(/about/i);
      expect(about).toBeDefined();

      const favorites = screen.getByText(/Favorite Pokémons/i);
      expect(favorites).toBeDefined();
    });

  it('Clicar em Home deve redirecionar para para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByText(/home/i);
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Clicar em About deve redirecionar para para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByText(/about/i);
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Clicar em Favorite deve redirecionar para para a URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favorites = screen.getByText(/favorite pokémons/i);
    userEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Ao entrar em uma URL desconhecida, deve ir para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/teste');
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeDefined();
  });
});
