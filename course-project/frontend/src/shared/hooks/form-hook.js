import { useCallback, useReducer } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
}

export default function useForm(inputs, isValid) {
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputs,
    isValid,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatchForm({
      type: "INPUT_CHANGE",
      inputId: id,
      value,
      isValid,
    });
  });

  return [formState, inputHandler];
}
