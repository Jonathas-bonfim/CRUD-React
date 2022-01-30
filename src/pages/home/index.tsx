import { FormEvent, useState, useContext } from "react";
import { IndexadoresContext } from "../../IndexadoresContext";
import { toast } from "react-toastify";


import { Header } from "../../components/header";
// import { Footer } from "../../components/footer";

import Modal from 'react-modal';

import editing from '../../assets/images/editing.png';
import del from '../../assets/images/delete.png';
import closeImg from '../../assets/images/close.png'

import './index.scss'
import { api } from "../../services/api";


export function Home() {
  const { indexadores, createIndexador } = useContext(IndexadoresContext);
  const [isNewRegisterModalOpen, setIsNewRegisterModalOpen] = useState(false);

  // const { searchIndexadorId, setSearchIndexadorId } = useState();

  function handleOpenNewRegisterModal() {
    setIsNewRegisterModalOpen(true);
  };

  function handleCloseNewRegisterModal() {
    setIsNewRegisterModalOpen(false);
    window.location.reload();
  }

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

  // function HandleUpdateIndexador(updateId: number) {
  //   updateIndexador({
  //     nome,
  //     simbolo
  //   })
  //     .then(response => {
  //       toast('Atualizado', {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         type: "success",
  //         theme: "colored",
  //       })
  //       setSimbolo('');
  //       setNome('');
  //       console.log(response)
  //     }).catch(err => {
  //       const error = err.response.data.errors.errorMessage;
  //       toast(error, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         type: "error",
  //         theme: "colored",
  //       })
  //       setSimbolo('');
  //       setNome('');
  //     });
  // }


  const [simbolo, setSimbolo] = useState('');
  const [nome, setNome] = useState('');
  async function handleCreateNewRegister(event: FormEvent) {
    event.preventDefault();

    createIndexador({
      nome,
      simbolo
    })
      .then(response => {
        toast('Cadastrado', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "success",
          theme: "colored",
        })
        console.log(response)
        setSimbolo('');
        setNome('');
      }).catch(err => {
        const error = err.response.data.errors.errorMessage;
        toast(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type: "error",
          theme: "colored",
        })
        setSimbolo('');
        setNome('');
      });
  }


  return (
    <body>
      <>
        <header>
          <Header />
        </header>
        <main>
          {/* <form onSubmit={() => HandleUpdateIndexador(searchIndexadorId)}> */}
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
                // onSubmit={() => HandleUpdateIndexador(searchIndexadorId)}
                >
                  Pesquisar
                </button>

              </div>
            </div>
          </form>
          <div className="div-include">
            <button onClick={handleOpenNewRegisterModal} className="button-include">+ Incluir Registro</button>
            <Modal
              overlayClassName="react-modal-overlay"
              className="react-modal"
              isOpen={isNewRegisterModalOpen}
              onRequestClose={handleCloseNewRegisterModal}
            >
              <button
                type="button"
                onClick={handleCloseNewRegisterModal}
                className="react-modal-close"
              >
                <img src={closeImg} alt="Fechar Modal" />
              </button>

              <form onSubmit={handleCreateNewRegister} className="form-modal">
                <h2>Cadastrar Registro</h2>

                <input
                  id="simbolo"
                  type="text"
                  placeholder="Símbolo"
                  value={simbolo}
                  onChange={event => setSimbolo(event.target.value)}
                />

                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={event => setNome(event.target.value)}

                />

                <button type="submit" onSubmit={handleCreateNewRegister}>
                  Cadastrar
                </button>
              </form>
            </Modal>
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
        {/* <Footer /> */}
      </>
    </body >

  )
}