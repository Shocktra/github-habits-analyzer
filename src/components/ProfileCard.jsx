import { Users, BookOpen, MapPin } from 'lucide-react';
import './ProfileCard.css';

export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="glass-panel profile-card animate-fade-in">
      <div className="profile-header">
        <img src={user.avatar_url} alt={`${user.login} avatar`} className="profile-avatar" />
        <div className="profile-info">
          <h2 className="profile-name">{user.name || user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="profile-username">
            @{user.login}
          </a>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
        </div>
      </div>
      
      <div className="profile-stats">
        <div className="stat-item">
          <Users size={18} className="stat-icon" />
          <span><strong>{user.followers}</strong> Takipçi</span>
        </div>
        <div className="stat-item">
          <Users size={18} className="stat-icon" />
          <span><strong>{user.following}</strong> Takip</span>
        </div>
        <div className="stat-item">
          <BookOpen size={18} className="stat-icon" />
          <span><strong>{user.public_repos}</strong> Repo</span>
        </div>
        {user.location && (
          <div className="stat-item">
            <MapPin size={18} className="stat-icon" />
            <span>{user.location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
