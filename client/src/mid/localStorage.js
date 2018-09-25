export const loadState = () => {
  try {
    const serialisedState = localStorage.getItem('state');
    return serialisedState === null ? undefined : JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('state', serialisedState);
  } catch (err) {}
};
