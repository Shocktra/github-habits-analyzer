import { useRef, useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import LanguageChart from './components/LanguageChart';
import { fetchUserData, fetchUserRepos, analyzeLanguages } from './services/githubApi';
import { Activity } from 'lucide-react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [langData, setLangData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const handleSearch = async (username) => {
    // Hızlı art arda aramalarda yalnızca son isteğin sonucu gösterilir.
    const id = ++requestId.current;
    setIsLoading(true);
    setError(null);
    setUser(null);
    setLangData(null);

    try {
      const [userData, repos] = await Promise.all([
        fetchUserData(username),
        fetchUserRepos(username),
      ]);
      if (id !== requestId.current) return;
      setUser(userData);
      setLangData(analyzeLanguages(repos));
    } catch (err) {
      if (id !== requestId.current) return;
      setError(err.message);
    } finally {
      if (id === requestId.current) setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header animate-fade-in">
        <Activity size={48} className="header-logo" />
        <h1>GitHub Habits Analyzer</h1>
        <p>Geliştirici karnenizi ve kodlama alışkanlıklarınızı keşfedin.</p>
      </header>

      <main className="app-main">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {error && (
          <div className="error-message animate-fade-in">
            {error}
          </div>
        )}

        {user && (
          <div className="dashboard-grid">
            <div className="profile-section">
              <ProfileCard user={user} />
            </div>
            <div className="stats-section">
              <LanguageChart langData={langData} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
