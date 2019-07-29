import { spEmployeeSagas, payPointSagas } from './index';

export const simplePaySagas = [...spEmployeeSagas, ...payPointSagas];
