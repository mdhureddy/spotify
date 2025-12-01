import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Navbar = ({ onSearch }) => {
  const [input, setInput] = useState('');
   const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);  // Send the search term up to App
    setInput(''); 
  };
  return (
    <>
    <nav className="navbar navbar-expand-lg fixed-top mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Music Player</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{backgroundColor:"white"}}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex me-5" role="search" onSubmit={handleSubmit}>
              <input className="form-control input-bg" type="search" placeholder="Search Song" aria-label="Search" value={input}  onChange={(e) => setInput(e.target.value)} />
              <button>🔍</button>
            </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-item-link" aria-current="page" to="/">Music</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-item-link" to="/favrot">Favrot Play List</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar