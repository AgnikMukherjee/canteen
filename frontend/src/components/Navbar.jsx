import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Model from '../Model';
import Cart from '../screens/Cart';
import  useCart  from './contextreducer';
export default function Navbar() {
  const navigate = useNavigate();

  const [cartview, setcartview] = React.useState(false);
  let data = useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">Canteen</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem('authtoken')) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myorders">My Orders</Link>
                </li> : ''
              }

            </ul>

            {(!localStorage.getItem('authtoken')) ?

              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Log in</Link>

                <Link className="btn bg-white text-success mx-1" to="/createuser">Sign up</Link>
              </div>
              :
              <div>
                <div className='btn bg-white text-success mx-2' to="/mycart" onClick={() => { setcartview(true) }}>My cart {''}
                <span className="badge bg-danger rounded-pill">{(data.length === 0)?"":data.length}</span>
                </div>
                {cartview? <Model onclose={() => { setcartview(false) }}><Cart /></Model>:null}
                <div className='btn bg-white text-danger mx-2' onClick={() => { localStorage.removeItem('authtoken'); navigate("/login") }}>Log out</div>

              </div>
              
            }


          </div>
        </div>
      </nav>
    </div>
  )
}
