import { Header } from "../../components/header";

import editing from '../../assets/images/editing.png';
import del from '../../assets/images/delete.png';

import './index.scss'

export function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      {/* <body> */}
      {/* <form action=""> */}
      <div className="div-search">
        <div className="components-search">
          <div className="search-id search-components">
            <p>ID</p>
            <input type="number" />
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
          {/* <button className="include search-buttons">Incluir</button> */}

        </div>
      </div>
      {/* </form> */}
      <a href="#" className="button">+ Incluir Registro</a>
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
          <tr>
            <td className="id">133</td>
            <td className="symbol">ATT15</td>
            <td className="name">American top Team</td>
            <td className="dateInclude">27/01/2022</td>
            <td className="dateAlteration">27/01/2022</td>
            <td className="edit"><img src={editing} alt="Editar" /> </td>
            <td className="del"> <img src={del} alt="Excluir" /> </td>
          </tr>

          <tr>
            <td className="id">133</td>
            <td className="symbol">ATT15</td>
            <td className="name">American top Team</td>
            <td className="dateInclude">27/01/2022</td>
            <td className="dateAlteration">27/01/2022</td>
            <td className="edit"><img src={editing} alt="Editar" /> </td>
            <td className="del"> <img src={del} alt="Excluir" /> </td>
          </tr>

          <tr>
            <td className="id">133</td>
            <td className="symbol">ATT15</td>
            <td className="name">American top Team</td>
            <td className="dateInclude">27/01/2022</td>
            <td className="dateAlteration">27/01/2022</td>
            <td className="edit"><img src={editing} alt="Editar" /> </td>
            <td className="del"> <img src={del} alt="Excluir" /> </td>
          </tr>

          <tr>
            <td className="id">133</td>
            <td className="symbol">ATT15</td>
            <td className="name">American top Team</td>
            <td className="dateInclude">27/01/2022</td>
            <td className="dateAlteration">27/01/2022</td>
            <td className="edit"><img src={editing} alt="Editar" /> </td>
            <td className="del"> <img src={del} alt="Excluir" /> </td>
          </tr>
        </tbody>

      </table>

      {/* </body> */}

    </>
  )
}