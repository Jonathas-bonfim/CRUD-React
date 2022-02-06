import { useContext } from "react";
import { IndexadoresContext } from "../../IndexadoresContext";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

import editing from '../../assets/images/editing.png';
import del from '../../assets/images/delete.png';

import './index.scss'

interface HomeProps {
  onOpenNewTransactionModal: () => void;
}

export function Home({ onOpenNewTransactionModal }: HomeProps) {
  const { indexadores } = useContext(IndexadoresContext);

  function HandleDeleteIndexador(DeleteId: number) {
    if (window.confirm('Tem certeza que você deseja excluir este registro?')) {
      api.delete(`/${DeleteId}`)
        .then(response => {
          toast('Registro Excluído', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: "success",
            theme: "colored",
          })
          setTimeout(() => {
            window.location.reload();
            console.log(response);
          }, 3000)
        }).catch(err => {
          const error = err.response.data.errors.errorMessage;
          toast(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type: "error",
            theme: "colored",
          })
        });
    }
  }
  return (
    <>
      <body>
        <Header />
        <main>
          <form>
            <div className="div-search">
              <div className="components-search">
                <div className="search-id search-components">
                  <p>ID</p>
                  <input type="number" min={0} />
                </div>

                <div className="search-symbol search-components">
                  <p>Símbolo</p>
                  <input type="text" />
                </div>

                <div className="search-name search-components">
                  <p>Nome</p>
                  <input type="text" />
                </div>

                <div className="search-date-register search-components">
                  <p>Data de Cadastro</p>
                  <input type="date" />
                </div>

                <div className="search-date-alteration search-components">
                  <p>Data de Alteração</p>
                  <input type="date" />
                </div>

                <button
                  className="search search-buttons"
                  disabled={true}
                >
                  Pesquisar
                </button>

              </div>
            </div>
          </form>
          <div className="div-include">
            <button
              onClick={onOpenNewTransactionModal}
              className="button-include"
            >
              + Incluir Registro</button>
          </div>

          <table id="data-table">
            <thead>
              <tr className="table-description">
                <th>ID</th>
                <th>Símbolo</th>
                <th>Nome</th>
                <th>Data de Cadastro</th>
                <th>Data de Alteração</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {indexadores.map(indexador => {
                return (
                  <tr key={indexador.id}>
                    <td className="id">{indexador.id}</td>
                    <td className="symbol">{indexador.simbolo}</td>
                    <td className="name">{indexador.nome}</td>
                    <td className="dateInclude">
                      {new Intl.DateTimeFormat('pt-BR').format(
                        new Date(indexador.dataCadastro)
                      )}
                    </td>
                    <td className="dateAlteration">
                      {
                        (
                          new Intl.DateTimeFormat('pt-BR').format(
                            new Date(indexador.dataAlteracao))
                        )}
                    </td>
                    <td className="edit">
                      <img src={editing} alt="Editar" />
                    </td>
                    <td className="del"
                      onClick={() => HandleDeleteIndexador(indexador.id)}
                    >
                      <img src={del} alt="Excluir" />
                    </td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>
        </main>
      </body >
      <Footer />
    </>

  )
}