import { render, screen } from '@testing-library/react';
import CreateNewService from '../main/CreateNewService';
import { Service, Field } from '../main/data/CloudServiceDataController';

test('Verify action items for new service form', () => {
  render(<CreateNewService service=
    {new Service(1, "label text", "description text", [
      new Field(1, "file storage", "put GB number that will be used", 0)
    ])} />);
  expect(screen.getByText(/save/i)).toBeInTheDocument();
  expect(screen.getByText(/description text/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/label text/i)).toBeInTheDocument();
  expect(screen.getByText(/file storage/i)).toBeInTheDocument();
  expect(screen.getByText(/put GB number that will be used/i)).toBeInTheDocument();
});