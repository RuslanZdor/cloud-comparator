import { render, screen } from '@testing-library/react';
import Summary from '../main/Summary';
import ServiceDataController, { Service } from '../main/data/CloudServiceDataController';

const service = new Service(
  "1",
  "object storage",
  "service.description",
  [
    {
      "label": "Storage",
      "id": "storage_size",
      "description": "Enter number of GB storage",
      "defaultValue": 0,
      "value": 50
    }
  ],
  {
    "aws": {
      "prices": {
        "storage_size": 1
      }
    },
    "gcp": {
      "prices": {
        "storage_size": 2
      }
    },
    "azure": {
      "prices": {
        "storage_size": 3
      }
    }
  }
)

test('Test that summary as multiple clouds', () => {
  render(<Summary services={[service]} />);
  expect(screen.getByText(/aws summary/i)).toBeInTheDocument();
  expect(screen.getByText(/gcp summary/i)).toBeInTheDocument();
  expect(screen.getByText(/azure summary/i)).toBeInTheDocument();
});

test('Test summary field - it has to be equal to all values to fields', () => {
  render(<Summary services={[service]} />);
  expect(screen.getByText(/150/i)).toBeInTheDocument();
})