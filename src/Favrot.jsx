import React, { useEffect, useState } from 'react'

const Favrot = () => {
    const [data,setData]=useState([]);
    const [count,setCount]=useState(0);
    const getFavrotSongs=()=>{
        const res=JSON.parse(localStorage.getItem("favorites")) || [];
        setData(res);
        setCount(res.length);
    }
    const removeFavSongs=(ele)=>{
        const updatedFavorites = data.filter(item => item.id !== ele.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setData(updatedFavorites);
        setCount(updatedFavorites.length);
    alert(`Removed "${ele.name}" from favorites`);
    }
    useEffect(()=>{getFavrotSongs()},[count]);
  return (
    <>
    <div className="container">
      <h1 style={{textAlign:"center",marginTop:"500px"}}>Favorite Songs: {count}</h1>
      <div className="row">
          <div className="row">
            {data.map((ele,index)=>{
            return  <div className="col-12 col-sm-12 col-md-4 col-lg-3 mb-5" key={index}>
                <div className="card h-100">
                  <img src={ele.album.images[0]?.url} className="card-img-top" alt={ele.name}/>
                  <div className="card-body">
                    <h5 className="card-title">{ele.name}</h5>
                    <p className="card-text"><strong>Artist:</strong> {ele.artists.map(a => a.name).join(", ")}</p>
                    {ele.preview_url ? ( <audio controls src={ele.preview_url} className="w-100" />) : (<p>No Preview Available</p>)}
                  </div>
                  <button className="btn btn-danger" onClick={()=>{removeFavSongs(ele)} }>Remove Fav</button>
                </div>
              </div>
            })}
          </div>
      </div>
    </div>
    </>
  )
}

export default Favrot