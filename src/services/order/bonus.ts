import { mockServer, invoke } from '@services/common';

export const bonusService = {
  getBonusData: () => invoke<BonusData>(mockServer.get('/bonus'))
};
