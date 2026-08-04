import { useState } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ onSearch, isLoading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-container animate-fade-in">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="GitHub kullanıcı adı girin (Örn: torvalds)"
          className="search-input"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="search-button">
          {isLoading ? 'Aranıyor...' : 'Analiz Et'}
        </button>
      </div>
    </form>
  );
}
