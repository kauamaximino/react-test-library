import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('Teste se página contém um heading h2', () => {
    renderWithRouter(<App />);

    const headingPokedex = screen.getByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const btnNextPokedex = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNextPokedex).toBeInTheDocument();

    userEvent.click(btnNextPokedex);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const actualPokemon = 'Pikachu';

    const btnNextPokedex = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNextPokedex).toBeInTheDocument();
    userEvent.click(btnNextPokedex);

    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).not.toBe(actualPokemon);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const buttonsFilters = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsFilters[0]).toHaveTextContent(/electric/i);
    expect(buttonsFilters[1]).toHaveTextContent(/fire/i);
    expect(buttonsFilters[2]).toHaveTextContent(/bug/i);
    expect(buttonsFilters[3]).toHaveTextContent(/poison/i);
    expect(buttonsFilters[4]).toHaveTextContent(/psychic/i);
    expect(buttonsFilters[5]).toHaveTextContent(/normal/i);
    expect(buttonsFilters[6]).toHaveTextContent(/dragon/i);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByText(/all/i);
    userEvent.click(btnAll);
  });
});
