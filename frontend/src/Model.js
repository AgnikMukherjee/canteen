import React from 'react'
import { createPortal } from 'react-dom';
const MODEL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(34,34,34)',
    padding: '50px',
    zIndex: 1000,
    height: '90%',
    width: '90%'
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}


export default function Model({ children, onclose }) {
    return createPortal(
        <>
            <div style={OVERLAY_STYLES}>
                <div style={MODEL_STYLES}>
                    <button className='btn btn-outline-success
                     fs-4' style={{ marginLeft: '90%', marginTop: '-35px' }} onClick={onclose}> x </button>
                    {children}
                </div>
            </div>

        </>,
        document.getElementById('cart-root')
    )
}
