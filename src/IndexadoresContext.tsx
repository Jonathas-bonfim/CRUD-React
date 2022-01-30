import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";


interface Indexador {
  id: string,
  simbolo: string,
  nome: string,
  dataCadastro: string,
  dataAlteracao: string,
}

interface IndexadorInput {
  simbolo: string,
  nome: string,
}

interface IndexadoresProviderProps {
  children: ReactNode
}

interface IndexadoresContextData {
  indexadores: Indexador[];
  createIndexador: (indexador: IndexadorInput) => Promise<void>;
}

export const IndexadoresContext = createContext<IndexadoresContextData>(
  {} as IndexadoresContextData,
);

export function IndexadoresProvider({ children }: IndexadoresProviderProps) {
  const [indexadores, setIndexadores] = useState<Indexador[]>([]);
  useEffect(() => {
    api.get('/')
      .then(response => setIndexadores(response.data.data));
  }, []);


  async function createIndexador(indexadorInput: IndexadorInput) {
    const response = await api.post('/', indexadorInput)
    const { indexadorId } = response.data.data;
    console.log(indexadorId);
  }

  return (
    <IndexadoresContext.Provider value={{ indexadores, createIndexador }}>
      {children}
    </IndexadoresContext.Provider>
  )

}