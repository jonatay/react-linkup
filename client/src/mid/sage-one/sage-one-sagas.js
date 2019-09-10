import {
  soBankAccountSagas,
  soBankTransactionSagas,
  soAccountSagas
} from "./index";

export const sageOneSagas = [
  ...soBankAccountSagas,
  ...soBankTransactionSagas,
  ...soAccountSagas
];
