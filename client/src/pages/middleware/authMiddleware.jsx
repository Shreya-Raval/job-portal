import { useEffect, useState } from 'react';
import apiCall from '../../helpers/api';

const useAuth = () => {
  const [user, setUser] = useState(undefined); 

  useEffect(() => {
    apiCall.get('/user/get-user', {
      withCredentials: true,
    })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null)); 
  }, []);

  return user;
};

export default useAuth;
