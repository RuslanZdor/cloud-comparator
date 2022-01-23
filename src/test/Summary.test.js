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
      "id": "memory_size",
      "value": 512
    }, {
      "label": "Run time",
      "id": "run_time",
      "value": 1000
    }, {
      "label": "Run count",
      "id": "run_count",
      "value": 3000000
    }
  ],
  {
    "aws": {
      "label": "AWS Function",
      "price_components": [
        {
          "name": "Requests price",
          "formula": "Math.max((run_count - free_run_count) * run_price, 0)"
        },
        {
          "name": "Computation price",
          "formula": "Math.max((memory_size / 1024 * run_time / 1000 * run_count - free_work) * work_price, 0)"
        }
      ],
      "prices": {
        "work_price": 0.000016,
        "run_price": 0.0000002,
        "free_run_count": 1000000,
        "free_work": 400000
      }
    },
    "gcp": {
      "label": "Google Function",
      "formula": "0",
      "prices": {
      }
    },
    "azure": {
      "label": "Azure Function",
      "formula": "0",
      "prices": {
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
  expect(screen.getByText(/18/i)).toBeInTheDocument();
})