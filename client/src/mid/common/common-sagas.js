// import { authSagas, navSagas, aclFrontSagas } from './';
import { authSagas } from './auth/index';
import { navSagas } from './nav/index';
import { aclFrontSagas } from './acl-front/index';

export const commonSagas = [...authSagas, ...navSagas, ...aclFrontSagas];
