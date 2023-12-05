import { apiClient, invoke } from './common';

export const configurationService = {
  getCoinPerPage: () => invoke(apiClient.GET('/api/configuration/coinPerPage')),
  getVNDPerCoin: () => invoke(apiClient.GET('/api/configuration/coinToVnd')),
  getServiceFee: () => invoke(apiClient.GET('/api/configuration/serviceFee')),
  getBonusCoin: () => invoke(apiClient.GET('/api/configuration/bonusCoinPer100000Vnd'))
};
