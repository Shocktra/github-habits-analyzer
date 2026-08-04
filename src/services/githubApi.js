const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("Kullanıcı bulunamadı.");
    if (response.status === 403) throw new Error("API Limitine ulaşıldı (GitHub). Lütfen daha sonra tekrar deneyin.");
    throw new Error("Kullanıcı verisi çekilirken bir hata oluştu.");
  }
  return response.json();
};

export const fetchUserRepos = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos?per_page=100&sort=pushed`);
  if (!response.ok) {
    throw new Error("Repolar çekilemedi.");
  }
  return response.json();
};

export const analyzeLanguages = (repos) => {
  const langCount = {};
  repos.forEach(repo => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });
  
  // Sort and get top 5 languages
  const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  const result = {
    labels: sorted.map(item => item[0]),
    data: sorted.map(item => item[1])
  };
  
  return result;
};
