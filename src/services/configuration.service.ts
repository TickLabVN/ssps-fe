import { apiClient, invoke } from './common';

export const configurationService = {
  getCoinPerPage: () => invoke(apiClient.GET('/api/configuration/coinPerPage')),
  getCoinPerDollar: () => invoke(apiClient.GET('/api/configuration/dollarToCoin')),
  getServiceFee: () => invoke(apiClient.GET('/api/configuration/serviceFee'))
};
