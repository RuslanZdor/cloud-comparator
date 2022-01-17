import { render, screen } from '@testing-library/react';
import Summary from '../main/Summary';

const service = {
  "name": "object storage",
  "fields": [
    {
      "label": "Storage",
      "id": "storage_size",
      "description": "Enter number of GB storage",
      "defaultValue": 0,
      "value": 50
    }
  ],
  "providers": {
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
}

test('Test that summary as multiple clouds', () => {
  render(<Summary />);
  expect(screen.getByText(/aws summary/i)).toBeInTheDocument();
  expect(screen.getByText(/gcp summary/i)).toBeInTheDocument();
  expect(screen.getByText(/azure summary/i)).toBeInTheDocument();
});

test('Test summary field - it has to be equal to all values to fields', () => {
  render(<FinishedService service={service} />);
  expect(screen.getByText(/150/i)).toBeInTheDocument();
})