import React from "react";
import PocketBase from "pocketbase";
import { pocketbaseUrl } from "../constants";

export const PocketBaseContext = React.createContext<PocketBase>(
  new PocketBase(pocketbaseUrl)
);

export function usePocketBase() {
  return React.useContext(PocketBaseContext);
}

export function PocketBaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PocketBaseContext.Provider value={new PocketBase(pocketbaseUrl)}>
      {children}
    </PocketBaseContext.Provider>
  );
}
