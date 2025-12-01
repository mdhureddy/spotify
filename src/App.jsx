import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Playlist from './Playlist';
import Favrot from './Favrot'
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState("top hits");
  const [musicData, setMusicData] = useState([]);

  const ResetSearchOnRouteChange = () => {
    const location = useLocation();
    useEffect(() => {
      if (location.pathname === '/') {
        setSearchTerm('');
      }
    }, [location]);
    return null;
  };

  return (
    <>
      <BrowserRouter>
        <ResetSearchOnRouteChange />
        <Navbar onSearch={setSearchTerm} />
        <Routes>
          <Route
            path="/"
            element={
              <Playlist
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                query={query}
                setQuery={setQuery}
                musicData={musicData}
                setMusicData={setMusicData}
              />
            }
          />
          <Route path="/favrot" element={<Favrot />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
