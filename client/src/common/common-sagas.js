import { navSagas, authSagas } from './'; //rightSagas

export const commonSagas = [...navSagas, ...authSagas];
