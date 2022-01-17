import { render, screen } from '@testing-library/react';
import App from '../main/App';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/cloud price comparator/i);
  expect(linkElement).toBeInTheDocument();
});
