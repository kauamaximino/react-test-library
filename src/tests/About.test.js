// it('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  it('Testa se a página contém 2 parágrafos as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const infoPokedex1 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all/i,
    );

    const infoPokedex2 = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );

    expect(infoPokedex1).toBeDefined();
    expect(infoPokedex2).toBeDefined();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const urlImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgAbout = screen.getByRole('img');
    expect(imgAbout.src).toBe(urlImage);
  });
});
