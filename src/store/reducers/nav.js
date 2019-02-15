import { CHANGE_FORM } from '../constants';

const initialState = {
  defaultForm: true // register
}

export default (state=initialState, action) => {
  switch (action.type) {
    case CHANGE_FORM:
      console.log(state.defaultForm);
      return { ...state, defaultForm: !state.defaultForm };

    default: return state;
  }
};
