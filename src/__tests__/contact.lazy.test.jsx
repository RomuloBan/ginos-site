import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFecthMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

const fetchMocker = createFecthMock(vi);
fetchMocker.enableMocks();

test('can submit contact form', async () => {
  fetchMocker.mockResponseOnce(JSON.stringify({ status: 'ok'}));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>
  );

  const nameInput = screen.getByPlaceholderText('Name');
  const emailInput = screen.getByPlaceholderText('Email');
  const msgTextArea = screen.getByPlaceholderText('Message');

  const testData = {
    name: 'Brian',
    email: 'dustinshatemail@example.com',
    message: 'just let brian teach, dustin'
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  msgTextArea.value = testData.message;

  const submitButton = screen.getByRole('button');
  submitButton.click();

  const h3 = await screen.findByRole('heading', { level: 3 });

  expect(h3.innerText).toContain('Submitted');

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  expect(requests[0].url).toBe('/api/contact');
  expect(fetchMocker).toHaveBeenCalledWith('/api/contact', {
    method: 'POST',
    body: JSON.stringify(testData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
});


