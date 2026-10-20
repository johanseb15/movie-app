// @vitest-environment jsdom

import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, test, vi } from "vitest";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  searchMovies,
} from "../api/tmdb";
import Home from "./Home";

vi.mock("../api/tmdb", () => ({
  fetchTrendingMovies: vi.fn(),
  fetchPopularMovies: vi.fn(),
  fetchTopRatedMovies: vi.fn(),
  searchMovies: vi.fn(),
  fetchMovieVideos: vi.fn(),
  getImageUrl: (path) => (path ? `/poster${path}` : ""),
}));

function deferred() {
  let resolve;
  const promise = new Promise((fulfill) => {
    resolve = fulfill;
  });
  return { promise, resolve };
}

test("mantiene la búsqueda de Dune cargando cuando termina el catálogo inicial", async () => {
  const trending = deferred();
  const popular = deferred();
  const topRated = deferred();
  const dune = deferred();
  vi.mocked(fetchTrendingMovies).mockReturnValue(trending.promise);
  vi.mocked(fetchPopularMovies).mockReturnValue(popular.promise);
  vi.mocked(fetchTopRatedMovies).mockReturnValue(topRated.promise);
  vi.mocked(searchMovies).mockReturnValue(dune.promise);

  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );

  await user.type(screen.getByRole("textbox"), "Dune");
  await user.click(screen.getByRole("button", { name: "Buscar" }));
  await waitFor(() => expect(searchMovies).toHaveBeenCalledWith("Dune"));

  await act(async () => {
    trending.resolve([]);
    popular.resolve([]);
    topRated.resolve([]);
  });
  const noResultsWhileDunePending = screen.queryByText("No se encontraron resultados");

  await act(async () => {
    dune.resolve([{ id: 2, title: "Dune", poster_path: "/dune.jpg" }]);
  });
  expect(screen.getByAltText("Dune")).not.toBeNull();
  expect(noResultsWhileDunePending).toBeNull();
});
