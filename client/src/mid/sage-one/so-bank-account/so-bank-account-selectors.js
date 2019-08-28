import { createSelector } from "reselect";

export const paymentMethod = [
  {
    id: 1,
    name: "Cash"
  },
  {
    id: 2,
    name: "Cheque"
  },
  {
    id: 3,
    name: "CreditCard"
  },
  {
    id: 4,
    name: "EFT"
  }
];

export const getSoBankAccountsRoot = state => {
  return state.sageOne.bankAccounts;
};

export const getSoBankAccountList = state => {
  return getSoBankAccountsRoot(state).list;
};

export const getSoBankAccountFilter = state => {
  return getSoBankAccountsRoot(state).filter;
};

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getSoBankAccountById = createSelector(
  getSoBankAccountList,
  (list, id) => list.filter(rec => rec.id === id)
);

export const getSoBankAccounts = createSelector(
  getSoBankAccountList,
  list => list.toArray()
);

export const getSoBankAccountsFiltered = createSelector(
  getSoBankAccounts,
  getSoBankAccountFilter,
  (bankAccounts, filter) =>
    bankAccounts
      .filter(ba => (filter.activeOnly ? ba.Active : true))
      .map(ba => ({
        ...ba,
        PaymentMethodLkp: paymentMethod.find(pm => pm.id === ba.PaymentMethod)
          .name,
        DefaultPaymentMethodLkp: ba.DefaultPaymentMethodId
          ? paymentMethod.find(pm => pm.id === ba.DefaultPaymentMethodId).name
          : "..."
      }))
);
