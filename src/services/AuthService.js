import HttpService from './HttpService.js'

export class AuthService {

  login(email, password){
    return HttpService.post('/auth/login',{
      email,
      password
    }).then(({data}) => data);
  }

  register( email, first_name, last_name, password, password_confirmation){
    return HttpService.post('/auth/register', {
      email,
      first_name,
      last_name,
      password,
      password_confirmation
    }).then(({data}) => data);
  }

  setAuthHeaders(token){
    if (!token) {
      delete HttpService.defaults.headers.common['Authorization'];
      return;
    }
    HttpService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

const checkForInitialToken = (authService) => {
  const token = localStorage.getItem('token');
  if (token) {
    authService.setAuthHeaders(token);
  }
}

const authService = new AuthService();
checkForInitialToken(authService);
export default authService;
