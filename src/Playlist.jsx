import axios from "axios";
import { useEffect, useState, useMemo } from "react";
const API_KEY = import.meta.env.VITE_APIKEY;
const Playlist = ({
  searchTerm,
  setSearchTerm,
  query,
  setQuery,
  musicData,
  setMusicData
}) => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const getMusic = async (q) => {
    const searchQuery = q.trim() !== "" ? q : "top hits";
    setLoading(true);
    try {
      const res = await axios.get(
        `https://v1.nocodeapi.com/madhu5436546/spotify/${API_KEY}/search?q=${searchQuery}&type=track&perPage=50&page=0`
      );
      setMusicData(res.data.tracks.items);
    } catch (err) {
      console.error("Failed to fetch music", err);
      setMusicData([]);
    }
    setLoading(false);
  };

  // Fetch only if no data exists (first time)
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setCount(favs.length);
    if (musicData.length === 0) {
      getMusic(query);
    } else {
      setLoading(false); // data is already available
    }
  }, []);

  // When new searchTerm comes from Navbar
  useEffect(() => {
    const trimmed = searchTerm.trim();
    if (trimmed !== "" && trimmed !== query) {
      setQuery(trimmed);
      getMusic(trimmed);
    }
  }, [searchTerm]);

  const addToFavorites = (song) => {
    const existingFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = existingFavorites.some(item => item.id === song.id);
    if (isAlreadyFavorite) {
      alert("Already in favorites!");
      return;
    }
    const updatedFavorites = [...existingFavorites, song];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert(`Added "${song.name}" to favorites!`);
    setCount(updatedFavorites.length);
  };

  const handleCategoryClick = (name) => {
    if (name !== query) {
      setQuery(name);
      getMusic(name);
    }
  };

  const items = useMemo(() => [
    { id:1, name:"Top songs", img:"https://m.media-amazon.com/images/I/41wKKRoKTML._UXNaN_FMjpg_QL85_.jpg" },
    { id:2, name:"New Songs", img:"https://timesofindia.indiatimes.com/photo/msid-65272843/65272843.jpg?resizemode=4" },
    { id:3, name:"Old songs", img:"https://mosaic.scdn.co/640/ab67616d00001e0237a4a6a95b251be81f93cee4ab67616d00001e024d44e9f1a1398db3ae023b31ab67616d00001e026e89e3aa20456bd913a9c886ab67616d00001e02995c528df25184646a780a2d" },
    { id:4, name:"Trending", img:"https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da845f468eda2489edcd6f68f7c3" },
    { id:5, name:"Ramp Songs", img:"https://i.scdn.co/image/ab67616d0000b273fabe8ec580688a949ee48045" },
    { id:6, name:"Dj songs", img:"https://i.ytimg.com/vi/sWXVoX1bIP0/sddefault.jpg" },
    { id:7, name:"Foke Songs", img:"https://c.saavncdn.com/editorial/logo/BollywoodFolk_20211217163126_500x500.jpg" },
    { id:8, name:"Items Songs", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNuS9Nknh3l6LUOeGCgssPZWhvxFBG4NRubg&s" },
    { id:9, name:"Love Songs", img:"https://cdn.pixabay.com/photo/2024/11/22/09/06/couple-9215839_640.jpg" },
    { id:10, name:"Motivational", img:"https://cdn.pixabay.com/photo/2020/07/01/23/23/music-5361245_640.jpg" },
    { id:11, name:"Sad Songs", img:"https://cdn.pixabay.com/photo/2018/05/22/22/36/girl-3422711_1280.jpg" }
  ], []);

  return (
    <div className="container">
      <h4 className="mb-3">Top Picks</h4>
      <div className="d-flex overflow-auto mb-4 gap-3 px-1">
        {items.map((ele) => (
          <div key={ele.id} className="text-center" style={{ minWidth: '80px' }} onClick={() => handleCategoryClick(ele.name)}>
            <img src={ele.img} alt="Not Found" className="rounded-circle" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
            <small className="d-block mt-1 text-truncate" style={{ maxWidth: '70px' }}>{ele.name}</small>
          </div>
        ))}
      </div>

      <h1 >Favorite Songs: {count}</h1>

      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="row">
          {musicData.map((ele, index) => (
            <div className="col-12 col-sm-12 col-md-4 col-lg-3 mb-5" key={index}>
              <div className="card h-100">
                <img src={ele.album.images[0]?.url} className="card-img-top" alt={ele.name} />
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <p className="card-text"><strong>Artist:</strong> {ele.artists.map(a => a.name).join(", ")}</p>
                  {ele.preview_url ? (
                    <audio controls src={ele.preview_url} className="w-100" />
                  ) : (
                    <p>No Preview Available</p>
                  )}
                </div>
                <button className="btn btn-success" onClick={() => addToFavorites(ele)}>Add To favorite</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playlist;
