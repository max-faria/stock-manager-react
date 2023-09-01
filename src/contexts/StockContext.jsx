import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const StockContext = createContext({});

StockContextProvider.propTypes = {
  children: PropTypes.node,
};

//nome, description, quantity, createdAt
export function StockContextProvider() {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("obc-react-stock");
    if (!storedItems) return [];
    const items = JSON.parse(storedItems);
    items.forEach((item) => {
      item.createdAt = new Date(item.createdAt);
      item.updatedAt = new Date(item.updatedAt);
    });
    return items;
  });

  const addItem = (item) => {
    //colocar o item na array the items
    setItems((currentState) => {
      const updatedItems = [item, ...currentState];
      localStorage.setItem("obc-react-stock", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const stock = {
    items, //estado atual dos items
    addItem,
  };

  return (
    <StockContext.Provider value={stock}>{children}</StockContext.Provider>
  );
}
