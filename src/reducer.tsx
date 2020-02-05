export const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case Actions.START:
      return { ...state, loading: true };
    case Actions.RESOLVE:
      return { ...state, loading: false, data: action.data };
    case Actions.ERROR:
      return { ...state, error: action.error };
    default:
      throw new Error("Error: Undetected action type.");
  }
};

export enum Actions {
  START,
  RESOLVE,
  ERROR
}
