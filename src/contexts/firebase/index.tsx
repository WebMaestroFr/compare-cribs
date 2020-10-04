import { createContext, useContext } from "react";

export interface FirebaseData {
  note: string;
}

interface FirebaseContext {
  read: (ref: string) => Promise<FirebaseData>;
  write: (ref: string, data: FirebaseData) => Promise<void>;
}

export const Firebase = createContext<FirebaseContext | null>(null);

export default () => useContext(Firebase) as FirebaseContext;
