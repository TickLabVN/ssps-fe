import { apiClient, invoke } from './common';

export const authService = {
  login: (loginData: LoginFormData) => invoke(apiClient.POST('/auth/login', { body: loginData })),
  logout: () => invoke(apiClient.DELETE('/auth/logout'))
};
