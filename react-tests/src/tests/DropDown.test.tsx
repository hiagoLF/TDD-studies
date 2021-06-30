import DropDown from "../components/DropDown";

import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { unmountComponentAtNode } from "react-dom";

const title = "Selecione o seu Pokemón Inicial";
const options = ["Bubasaur", "Pikaxu", "Anestesia"];

describe("DropDown", () => {
   let container: Element | undefined;
   beforeEach(() => {
      // Configura um elemento do DOM como alvo do teste
      container = document.createElement("div");
      document.body.appendChild(container);
   });

   afterEach(() => {
      // Limpar ao sair
      if (!container) return;
      unmountComponentAtNode(container);
      container.remove();
      container = undefined;
   });

   it("Should start closed", () => {
      const { queryByText } = render(
         <DropDown title={title} options={options} onSelect={() => {}} />,
         {
            container,
         }
      );

      options.forEach((option) => {
         expect(queryByText(option)).not.toBeInTheDocument();
      });
   });

   it("Should show options when open", () => {
      // Renderizar o componente em memória
      const { queryByRole } = render(
         <DropDown title={title} options={options} onSelect={() => {}} />,
         {
            container,
         }
      );

      options.forEach((option) => {
         expect(
            queryByRole("menuitem", { name: option })
         ).not.toBeInTheDocument();
      });

      const dropDownButton = screen.getByRole("button", { name: title });
      userEvent.click(dropDownButton);

      options.forEach((option) => {
         expect(queryByRole("menuitem", { name: option })).toBeInTheDocument();
      });
   });

   it("Should signal an option was selected and close options", () => {
      // Função Mock criada pelo Jest
      const onSelect = jest.fn();

      // Renderizar o componente
      const { queryByRole } = render(
         <DropDown title={title} options={options} onSelect={onSelect} />,
         {
            container,
         }
      );

      // Buscar o botão e clicar nele
      const dropDownButton = screen.getByRole("button", { name: title });
      userEvent.click(dropDownButton);

      // Verificar se as opções estão abertas
      options.forEach((option) => {
         expect(queryByRole("menuitem", { name: option })).toBeInTheDocument();
      });

      // Buscar uma opção para ser clicada e clicar nela.
      const menuItemToBeClicked = screen.getByRole("menuitem", {
         name: options[0],
      });
      userEvent.click(menuItemToBeClicked);

      // Verificar se a função onSelect foi chamada com o texto da options[0] como argumento
      expect(onSelect).toHaveBeenCalledWith(options[0]);

      // Verificar se as opções foram fechadas
      options.forEach((option) => {
         expect(
            queryByRole("menuitem", { name: option })
         ).not.toBeInTheDocument();
      });
   });
});
