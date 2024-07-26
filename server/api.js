import axios from 'axios';

export const fetchAgents = () => {
  return axios.get('/api/agents');
};

export const fetchGroups = () => {
  return axios.get('/api/groups');
};
