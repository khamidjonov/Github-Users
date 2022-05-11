import axios from 'axios';

const Github_URL = process.env.REACT_APP_GITHUB_URL;
const Github_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: Github_URL,
  headers: {
    Authorization: `token ${Github_TOKEN}`,
  },
});

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// Get User Repos

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
