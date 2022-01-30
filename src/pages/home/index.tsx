import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { api } from "../../services/api";

import Modal from 'react-modal';

import editing from '../../assets/images/editing.png';
import del from '../../assets/images/delete.png';
import closeImg from '../../assets/images/close.png'

import './index.scss'

interface Indexador {
  id: string,
  simbolo: string,
  nome: string,
  dataCadastro: string,
  dataAlteracao: string,
}

export function Home() {

  // useEffect(() => {
  //   api.get('/')
  //     .then(response => console.log(response.data))
  // }, []);


  const [isNewRegisterModalOpen, setIsNewRegisterModalOpen] = useState(false);

  function handleOpenNewRegisterModal() {
    setIsNewRegisterModalOpen(true);
  };

  function handleCloseNewRegisterModal() {
    setIsNewRegisterModalOpen(false);
  }

  const [indexadores, setIndexadores] = useState<Indexador[]>([]);
  useEffect(() => {
    api.get('/')
      .then(response => setIndexadores(response.data));
  }, []);

  const [simbolo, setSimbolo] = useState('');
  const [nome, setNome] = useState('');
  function handleCreateNewRegister(event: FormEvent) {
    event.preventDefault();
    const data = ({
      simbolo,
      nome
    });
    api.post('/', data, {
      headers: {
        simbolo: simbolo,
        nome: nome,
      }
    });
  }


  return (
    <body>
      <header>
        <Header />
      </header>
      <main>
        <form action="">
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

              <button className="search search-buttons">Pesquisar</button>

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
            {indexadores.map(indexador => (
              <tr>
                <td className="id">{indexador.id}</td>
                <td className="symbol">{indexador.simbolo}</td>
                <td className="name">{indexador.nome}</td>
                <td className="dateInclude">{indexador.dataCadastro}</td>
                <td className="dateAlteration">{indexador.dataAlteracao}</td>
                <td className="edit"><img src={editing} alt="Editar" /> </td>
                <td className="del"> <img src={del} alt="Excluir" /> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </body>

  )
}