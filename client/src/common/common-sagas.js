// import { authSagas, navSagas, aclFrontSagas } from './';
import { authSagas } from './auth';
import { navSagas } from './nav';
import { aclFrontSagas } from './acl-front';

export const commonSagas = [...authSagas, ...navSagas, ...aclFrontSagas];
