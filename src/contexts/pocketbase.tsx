import React from "react";
import PocketBase from "pocketbase";

export const PocketBaseContext = React.createContext<PocketBase>(
  new PocketBase("https://duolearn-pocketbase.tobycm.dev")
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
    <PocketBaseContext.Provider
      value={new PocketBase("https://duolearn-pocketbase.tobycm.dev")}
    >
      {children}
    </PocketBaseContext.Provider>
  );
}
