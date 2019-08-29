import { soBankAccountSagas, soBankTransactionSagas } from "./index";

export const sageOneSagas = [...soBankAccountSagas, ...soBankTransactionSagas];
