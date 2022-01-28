import './index.scss';

import logo from '../../assets/images/logo-header.png';

export function Header() {
  return (
    <div className="logo">
      <img src={logo} alt="Logo da empresa" />
    </div>
  )
}