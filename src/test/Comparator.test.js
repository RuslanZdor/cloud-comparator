import { render, screen } from '@testing-library/react';
import Comparator, { Service } from '../main/Comparator';

test('Test that compartor as multiple clouds', () => {
  render(<Comparator />);
  expect(screen.getByText(/aws/i)).toBeInTheDocument();
  expect(screen.getByText(/gcp/i)).toBeInTheDocument();
  expect(screen.getByText(/azure/i)).toBeInTheDocument();
});