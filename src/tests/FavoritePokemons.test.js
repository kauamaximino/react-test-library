import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);

    const checkedFavorite = screen.getByText(/pokémon favorito?/i);
    userEvent.click(checkedFavorite);
    history.push('/favorites');

    const checking = screen.getAllByRole('link', { name: /more details/i });
    expect(checking.length >= 1).toBe(true);
  });
});
