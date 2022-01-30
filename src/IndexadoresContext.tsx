import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";


interface Indexador {
  id: number,
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
  updateIndexador: (indexador: IndexadorInput) => Promise<void>;
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
    await api.post('/', indexadorInput)
  }

  async function updateIndexador(indexadorInput: IndexadorInput) {
    await api.patch('/', indexadorInput)
  }

  return (
    <IndexadoresContext.Provider value={{ indexadores, createIndexador, updateIndexador }}>
      {children}
    </IndexadoresContext.Provider>
  )

}