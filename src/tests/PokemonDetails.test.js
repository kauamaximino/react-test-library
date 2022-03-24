import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  it('Testa se as informações do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    expect(linkMoreDetails).not.toBeInTheDocument();

    const name = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
    expect(name).toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const resumePokemon = screen.getByText(/his intelligent Pokémon roasts hard/i);
    expect(resumePokemon).toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const location = screen.getByRole('heading', { name: /Game Locations/i });
    expect(location).toBeInTheDocument();

    const locationMap1 = screen.getByText('Kanto Viridian Forest');
    expect(locationMap1).toBeInTheDocument();

    const locationMap2 = screen.getByText('Kanto Power Plant');
    expect(locationMap2).toBeInTheDocument();

    const imageMap = screen.getAllByRole('img');
    expect(imageMap[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imageMap[1].alt).toBe('Pikachu location');
    expect(imageMap[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imageMap[2].alt).toBe('Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);

    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const label = screen.getByText(/Pokémon favoritado/i);
    expect(label).toBeInTheDocument();
  });
});
