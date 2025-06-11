import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Signup() {

    const [credentials, setcredentials] = useState({name: "",location: "", email: "", password: ""});

    const handleSubmit = async(e) => {
        e.preventDefault();
        const responce = await fetch("https://vercel.com/agnik-mukherjees-projects/canteen/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name:credentials.name,
                address: credentials.location,
                email: credentials.email,
                password:  credentials.password
            })
        })

        const json = await responce.json();
        console.log(json)

        if(!json.success){
            alert("Enter Valid Credentials")
        }else{
            alert("Signed Up Successfully")
        }
    }
    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
            <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange = {onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Address</label>
                    <input type="test" className="form-control" name='location' value={credentials.location} onChange = {onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email}id="exampleInputEmail1" aria-describedby="emailHelp"onChange = {onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange = {onChange}/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>

            </form>
            </div>
        </>
    )
}
