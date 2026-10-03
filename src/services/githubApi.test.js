import { afterEach, describe, expect, it, vi } from 'vitest';
import { analyzeLanguages, fetchUserData, fetchUserRepos } from './githubApi';

const respond = (status, body = {}) => ({ ok: status >= 200 && status < 300, status, json: async () => body });

afterEach(() => vi.unstubAllGlobals());

describe('analyzeLanguages', () => {
  it('counts languages, sorts by count and keeps the top 5', () => {
    const repos = [
      ...Array(3).fill({ language: 'JavaScript' }),
      ...Array(2).fill({ language: 'Python' }),
      { language: 'Go' },
      { language: 'Rust' },
      { language: 'C' },
      { language: 'Java' },
    ];
    const { labels, data } = analyzeLanguages(repos);
    expect(labels).toHaveLength(5);
    expect(labels.slice(0, 2)).toEqual(['JavaScript', 'Python']);
    expect(data.slice(0, 2)).toEqual([3, 2]);
  });

  it('ignores forks and repos without a language', () => {
    const repos = [{ language: 'Go', fork: true }, { language: null }, { language: 'Rust' }];
    expect(analyzeLanguages(repos)).toEqual({ labels: ['Rust'], data: [1] });
  });

  it('breaks ties alphabetically so the order is stable', () => {
    const repos = [{ language: 'Rust' }, { language: 'Go' }];
    expect(analyzeLanguages(repos).labels).toEqual(['Go', 'Rust']);
  });

  it('handles an empty list', () => {
    expect(analyzeLanguages([])).toEqual({ labels: [], data: [] });
  });
});

describe('fetchUserData / fetchUserRepos', () => {
  it('encodes the username in the URL path', async () => {
    const fetchMock = vi.fn().mockResolvedValue(respond(200, {}));
    vi.stubGlobal('fetch', fetchMock);
    await fetchUserData('a/b?x=1');
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.github.com/users/a%2Fb%3Fx%3D1');
  });

  it('maps 404 to a not-found message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respond(404)));
    await expect(fetchUserData('nobody')).rejects.toThrow('Kullanıcı bulunamadı.');
  });

  it.each([403, 429])('maps %i to the rate-limit message for both endpoints', async (status) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respond(status)));
    await expect(fetchUserData('x')).rejects.toThrow('API Limitine');
    await expect(fetchUserRepos('x')).rejects.toThrow('API Limitine');
  });
});
