import React, { useEffect, useRef, useState } from 'react'
import { useCart, useCartdispatch } from './contextreducer';


export default function Card(props) {
    let dispatch = useCartdispatch();
    let data = useCart();

    const priceref = useRef();

    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setqty] = useState(1);
    const [size, setsize] = useState("");


    // const handleAddToCart = async () => {
    //     let food = []
    //     for (const item in data) {
    //         if (item.id === props.fooditem._id) {
    //             food = item;
    //             break;
    //         }
    //     }

    //     if (Array.isArray(food) && food.length !== 0) {
    //         if (food.size === size) {
    //             await dispatch({ type: "UPDATE", id: props.fooditem._id, price: finalprice, qty: qty });
    //             return
    //         }else if(food.size !== size){
                
    //             await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalprice, qty: qty, size: size });
    //             return
    //         }
    //         return
    //     }
    //         await dispatch({ type: "ADD", id: props.fooditem._id, name: props.fooditem.name, price: finalprice, qty: qty, size: size });

    // }

const handleAddToCart = async () => {
    let food = null; // Initialize as null
    // Proper array iteration
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === props.fooditem._id && data[i].size === size) {
            food = data[i];
            break;
        }
    }

    if (food) {
        await dispatch({ 
            type: "UPDATE", 
            id: props.fooditem._id, 
            size: size, // Include size in update
            price: finalprice, 
            qty: qty 
        });
    } else {
        await dispatch({ 
            type: "ADD", 
            id: props.fooditem._id, 
            name: props.fooditem.name, 
            price: finalprice, 
            qty: qty, 
            size: size 
        });
    }
}

    let finalprice = qty * parseInt(options[size]);
    useEffect(() => {
        setsize(priceref.current.value);
    }, [])
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.fooditem.img} className="card-img-top" alt="..." style={{ "height": "150px", "objectFit": "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.fooditem.name}</h5>
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setqty(e.target.value)} value={qty
                            }>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className="m-2 h-100 bg-success rounded" ref={priceref} onChange={(e) => setsize(e.target.value)} >
                                {priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    )
                                })}
                            </select>
                            <div className="d-inline h-100 fs-5">₹{finalprice}</div>
                        </div>
                    </div>
                    <button className="btn btn-success justify-content-center mx-2 mb-2" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
