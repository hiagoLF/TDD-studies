import React, { MouseEventHandler, useState } from "react";

type DropDownProperties = {
   title?: string;
   options?: Array<string>;
   onSelect?: (text: string) => void;
};

const DropDown = ({ title, options, onSelect }: DropDownProperties) => {
   const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

   const handleMenuOptionClick = (option: string) => {
      onSelect && onSelect(option);
      setDropDownOpen(false);
   };

   return (
      <div className="container-dropdown">
         <button onClick={() => setDropDownOpen(true)}>{title}</button>

         {dropDownOpen && (
            <ul role="menu">
               {options?.map((option, key) => (
                  <li
                     role="menuitem"
                     key={key}
                     onClick={() => handleMenuOptionClick(option)}
                  >
                     {option}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};

export default DropDown;
