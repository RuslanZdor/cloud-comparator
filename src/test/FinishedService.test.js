import { render, screen } from '@testing-library/react';
import FinishedService from '../main/FinishedService';
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

test('Test that service contain service name', () => {
  render(<FinishedService service={service} />);
  expect(screen.getByText(/object storage/i)).toBeInTheDocument();
  expect(screen.getAllByText(/150/i).length > 0).toBe(true);
});

test('Test that if provider is not exist for specific service - application will display proper message', () => {
  const serviceWithOutProvider = {
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
    "providers": {}
  }
  render(<FinishedService service={serviceWithOutProvider} />);
  expect(screen.getByText(/object storage/i)).toBeInTheDocument();
  expect(screen.getAllByText("This cloud provider has no this service").length).toBe(3);
});

test('Test summary field - it has to be equal to all values to fields', () => {
  render(<FinishedService service={service} />);
  expect(screen.getAllByText(/summary:/i).length).toBe(3);
  expect(screen.getAllByText(/150/i).length > 0).toBe(true);
})