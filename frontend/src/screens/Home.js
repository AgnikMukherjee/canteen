import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
// import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Card from "../components/Card";
export default function Home() {
    const [search , setsearch] = useState("");
    const [foodCategory, setfoodCategory] = useState([]);
    const [foodData, setfoodData] = useState([]);

    const loadData = async () => {
        const response = await fetch("https://canteen-backend-7aj8.onrender.com/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();

        setfoodData(json[0]);
        setfoodCategory(json[1]);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div >
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" >
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: '10' }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                                <button className="btn btn-outline-success text-white" type="submit">Search</button>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" style={{ height: "100vh", objectFit: "cover", objectPosition: "center" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1705472017435-7a820b01f36c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHxkYXJrZm9yZXN0JTIwY2FrZXxlbnwwfHwwfHx8MA%3D%3D" className="d-block w-100" style={{ height: "100vh", objectFit: "cover", objectPosition: "center" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHx8MHx8fDA%3D" className="d-block w-100" style={{ height: "100vh", objectFit: "cover", objectPosition: "center" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {foodCategory.length > 0 ?
                    foodCategory.map((data) => (
                        <div className="row mb-3">
                            <div key={data._id} className="fs-3 m-3">
                                {data.CategoryName}
                            </div>
                            <hr />
                            {foodData.length > 0 ?
                                foodData
                                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                    .map((filteredItem) => (
                                        <div key={filteredItem._id} class='col-12 col-md-6 col-lg-3' >
                                            <Card fooditem={filteredItem} options={filteredItem.options[0]}  />
                                        </div>
                                    ))
                                : "no data found!"
                            }
                        </div>
                    ))
                    : ""}

            </div>
            <div><Footer /></div>
        </div>
    );
}
