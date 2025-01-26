import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import Pizza from '../Pizza';

test('alt text renders on pizza image', async () => {
  const name = 'My Favorite Pizza';
  const src = 'https://picsum.photos/200';
  const screen = render(
    <Pizza name={name} description='super cool pizza' image={src} />
  );

  const img = await screen.getByRole('img');
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});