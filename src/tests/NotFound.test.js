import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const headingNotFound = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i });
    expect(headingNotFound).toBeInTheDocument();
  });

  it('Testa se há uma imagem no componente', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getAllByRole('img');
    expect(imgNotFound[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
