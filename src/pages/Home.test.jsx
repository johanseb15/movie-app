// @vitest-environment jsdom

import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { searchMovies } from "../api/tmdb";
import Home from "./Home";

vi.mock("../api/tmdb", async (importOriginal) => ({
  ...(await importOriginal()),
  fetchTrendingMovies: vi.fn(async () => []),
  fetchPopularMovies: vi.fn(async () => []),
  fetchTopRatedMovies: vi.fn(async () => []),
  searchMovies: vi.fn(),
}));

function deferred() {
  let resolve;
  const promise = new Promise((fulfill) => {
    resolve = fulfill;
  });
  return { promise, resolve };
}

test("conserva Dune cuando Batman responde después", async () => {
  const batman = deferred();
  const dune = deferred();
  vi.mocked(searchMovies).mockImplementation((query) => {
    if (query === "Batman") return batman.promise;
    if (query === "Dune") return dune.promise;
    throw new Error(`Búsqueda inesperada: ${query}`);
  });

  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
  await waitFor(() => expect(screen.queryByText(/Top 10:/)).toBeNull());

  const searchInput = screen.getByRole("textbox");
  await user.type(searchInput, "Batman");
  await user.click(screen.getByRole("button", { name: "Buscar" }));
  await user.clear(searchInput);
  await user.type(searchInput, "Dune");
  await user.click(screen.getByRole("button", { name: "Buscar" }));

  await act(async () => {
    dune.resolve([{ id: 2, title: "Dune", poster_path: "/dune.jpg" }]);
  });
  expect(screen.getByAltText("Dune")).not.toBeNull();

  await act(async () => {
    batman.resolve([{ id: 1, title: "Batman", poster_path: "/batman.jpg" }]);
  });
  expect(screen.queryByAltText("Dune")).not.toBeNull();
  expect(screen.queryByAltText("Batman")).toBeNull();
});
