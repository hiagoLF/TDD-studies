import "@testing-library/jest-dom/extend-expect";

import AnotherPokemons from "../components/AnotherPokemons";

import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { unmountComponentAtNode, render as reactDomRender } from "react-dom";
import { act } from "react-dom/test-utils";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { stringify } from "querystring";

const pokemonsUrl = "https://pokeapi.co/api/v2/pokemon/";
const fakePokemonData = {
   count: 1118,
   next: "https://pokeapi.co/api/v2/pokemon/?offset=25&limit=5",
   previous: "https://pokeapi.co/api/v2/pokemon/?offset=15&limit=5",
   results: [
      {
         name: "spearow",
         url: "https://pokeapi.co/api/v2/pokemon/21/",
      },
      {
         name: "fearow",
         url: "https://pokeapi.co/api/v2/pokemon/22/",
      },
      {
         name: "ekans",
         url: "https://pokeapi.co/api/v2/pokemon/23/",
      },
      {
         name: "arbok",
         url: "https://pokeapi.co/api/v2/pokemon/24/",
      },
      {
         name: "pikachu",
         url: "https://pokeapi.co/api/v2/pokemon/25/",
      },
   ],
};
const morePokemonsData = {
   count: 1118,
   next: "https://pokeapi.co/api/v2/pokemon/?offset=30&limit=5",
   previous: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=5",
   results: [
      {
         name: "raichu",
         url: "https://pokeapi.co/api/v2/pokemon/26/",
      },
      {
         name: "sandshrew",
         url: "https://pokeapi.co/api/v2/pokemon/27/",
      },
      {
         name: "sandslash",
         url: "https://pokeapi.co/api/v2/pokemon/28/",
      },
      {
         name: "nidoran-f",
         url: "https://pokeapi.co/api/v2/pokemon/29/",
      },
      {
         name: "nidorina",
         url: "https://pokeapi.co/api/v2/pokemon/30/",
      },
   ],
};

// Configurando as rotas da api mock
const server = setupServer(
   rest.get(pokemonsUrl, (req, res, ctx) => {
      const query = req.url.searchParams;
      const offset = query.get("offset");
      const limit = query.get("limit");

      if (offset === "20") return res(ctx.json(fakePokemonData));
      if (offset === "25") return res(ctx.json(morePokemonsData));
   })
);

describe("AnotherPokemons", () => {
   let container: Element | undefined;
   beforeEach(() => {
      // Configura um elemento do DOM como alvo do teste
      container = document.createElement("div");
      document.body.appendChild(container);
      // Deixar o servidor mock ouvindo as requisições que o aplicativo faz
      server.listen();
   });

   afterEach(() => {
      // Limpar ao sair
      if (!container) return;
      unmountComponentAtNode(container);
      container.remove();
      container = undefined;
      // Limpar todas as requisições do servidor mock
      server.resetHandlers();
   });

   // Desligar o servidor mock
   afterAll(() => server.close());

   it("Should load another pokemons when open", async () => {
      render(<AnotherPokemons />);

      await waitFor(() => screen.getByText("spearow"));

      const pokemonsNames = fakePokemonData.results.map(
         ({ name, url }) => name
      );

      pokemonsNames.forEach((name) => {
         expect(screen.getByText(name)).toBeInTheDocument();
      });
   });

   it("Shoult get more pokemons when button clicked", async () => {
      render(<AnotherPokemons />);

      fireEvent.click(screen.getByText("Pegar Mais pokemóns"));

      await waitFor(() => screen.getByText("raichu"));

      const pokemonsNames = morePokemonsData.results.map(
         ({ name, url }) => name
      );

      pokemonsNames.forEach((name) => {
         expect(screen.getByText(name)).toBeInTheDocument();
      });
   });

   // Maneira muito doida de fazer um mock para consulta em API
   // it("Should get another pokemons names", async () => {
   //    jest.spyOn(global, "fetch").mockImplementation(
   //       () =>
   //          Promise.resolve({
   //             json: () => Promise.resolve(fakePokemonData),
   //          }) as Promise<Response>
   //    );

   //    await act(async () => {
   //       reactDomRender((<AnotherPokemons />) as any, container as any);
   //    });

   //    expect(screen.queryByText("spearow")).toBeInTheDocument();
   // });
});
