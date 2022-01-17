import { render, screen } from '@testing-library/react';
import SelectService from '../main/SelectService';

let tempServices = [
  { name: "first service", id: 1 },
  { name: "second service", id: 2 }
];

let mockClickHandler = () => {

}

test('Test that select service has rendered elements', () => {
  render(<SelectService services={tempServices} addCurrentService={mockClickHandler} />);
  expect(screen.getByText(/add service/i)).toBeInTheDocument();
});