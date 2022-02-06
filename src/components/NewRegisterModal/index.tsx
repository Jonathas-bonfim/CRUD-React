
import { FormEvent, useState, useContext } from "react";
import { IndexadoresContext } from "../../IndexadoresContext";
import { toast } from "react-toastify";

import Modal from 'react-modal';
import closeImg from '../../assets/images/close.png'

import './index.scss'

interface NewRegisterModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewRegisterModal({ isOpen, onRequestClose }: NewRegisterModalProps) {
  const { createIndexador } = useContext(IndexadoresContext);


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
          autoClose: 3000,
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
    <Modal
      overlayClassName="react-modal-overlay"
      className="react-modal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <button
        type="button"
        onClick={onRequestClose}
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
  )
}