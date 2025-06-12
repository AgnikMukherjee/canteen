import React from 'react'
import { useCart, useCartdispatch } from '../components/contextreducer'



export default function Cart() {

let data = useCart();
let dispatch = useCartdispatch();
if(data.length === 0){
    return(
        <div className='m-5 w-100 text-center fs-1'>Your cart is empty !</div>
    )
}

const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    try {
        let response = await fetch("https://canteen-alpha.vercel.app/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                order_data: data,
                order_date: new Date().toDateString()
            })
        });

        // First check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            throw new Error(`Server returned ${response.status}: ${text}`);
        }

        const result = await response.json();
        if (result.success) {
            dispatch({ type: "DROP" });
        } else {
            alert(result.error || "Failed to place order");
        }
    } catch (error) {
        alert("Checkout error: " + error.message);
    }
};

let totalprice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <table class="table m-auto table-responsive table-responsive-sm table-responsive-md table-striped table-hover ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                        <th scope="col">Price</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td><button type="button" class="btn btn-outline-danger" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><i className="fa-solid fa-trash-can"></i></button></td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>

            <div className='container m-auto mt-5 d-flex justify-content-between'>
                <div className='fs-2 d-inline'>Total Price : Rs.{totalprice}</div>
                <div className='d-inline'>
                    <button className='btn bg-success ' onClick={handleCheckout}>Check out</button>
                </div>
            </div>
            


        </div>
    )
}
