const BASE_URL = 'https://api.github.com';

const RATE_LIMIT_MESSAGE = 'API Limitine ulaşıldı (GitHub). Lütfen daha sonra tekrar deneyin.';

const isRateLimited = (response) => response.status === 403 || response.status === 429;

export const fetchUserData = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error('Kullanıcı bulunamadı.');
    if (isRateLimited(response)) throw new Error(RATE_LIMIT_MESSAGE);
    throw new Error('Kullanıcı verisi çekilirken bir hata oluştu.');
  }
  return response.json();
};

export const fetchUserRepos = async (username) => {
  const response = await fetch(
    `${BASE_URL}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`
  );
  if (!response.ok) {
    if (isRateLimited(response)) throw new Error(RATE_LIMIT_MESSAGE);
    throw new Error('Repolar çekilemedi.');
  }
  return response.json();
};

export const analyzeLanguages = (repos) => {
  const langCount = {};
  repos.forEach((repo) => {
    // Fork'lar kullanıcının kendi alışkanlığını yansıtmaz.
    if (repo.language && !repo.fork) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });

  // En çok kullanılan 5 dil
  const sorted = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5);

  return {
    labels: sorted.map((item) => item[0]),
    data: sorted.map((item) => item[1]),
  };
};
