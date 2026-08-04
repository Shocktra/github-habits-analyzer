import { useState } from 'react';
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

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError(null);
    setUser(null);
    setLangData(null);

    try {
      const userData = await fetchUserData(username);
      setUser(userData);
      
      const repos = await fetchUserRepos(username);
      const analyzedLangs = analyzeLanguages(repos);
      setLangData(analyzedLangs);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
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
