import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getByTestId(/pokemon-name/i);
    expect(pokemon).toHaveTextContent(/pikachu/i);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);

    const weight = screen.getByTestId(/pokemon-weight/i);
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);

    const image = screen.getByRole('img');
    expect(image.alt).toBe('Pikachu sprite');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se o card na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    // console.log(history.location.pathname);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se ao clicar no link, é redirecionado para a página de detalhes.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const details = screen.getByText(/details/i);
    expect(details).toBeInTheDocument();

    const summary = screen.getByText(/summary/i);
    expect(summary).toBeInTheDocument();
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const star = screen.getAllByRole('img');
    // console.log(star[1].alt);
    expect(star[1].src).toBe('http://localhost/star-icon.svg');
    expect(star[1].alt).toBe('Pikachu is marked as favorite');
  });
});
