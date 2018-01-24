import { navSagas, authSagas, aclFrontSagas } from './';

export const commonSagas = [...navSagas, ...authSagas, ...aclFrontSagas];
