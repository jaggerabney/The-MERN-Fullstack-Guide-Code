import { useCallback, useReducer } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }

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
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
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
  }, []);

  const setFormData = useCallback((inputs, formIsValid) => {
    dispatchForm({
      type: "SET_DATA",
      inputs,
      formIsValid,
    });
  }, []);

  return [formState, inputHandler, setFormData];
}
