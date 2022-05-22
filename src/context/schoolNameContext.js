import { createContext } from "./createContext";

const initialSchoolState = {
  schools: [],
  selectedSchool: {},
  selectedBatch: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateSchools":
      return { ...state, schools: action.payload };

    case "addSchools":
      return { ...state, schools: [...state.schools, action.payload] };

    case "updateSelectedSchool":
      return {
        ...state,
        selectedSchool: action.payload,
      };

    case "updateSelectedBatch":
      return {
        ...state,
        selectedBatch: action.payload,
      };

    case "deleteSchool":
      const updatedSchool = state.schools.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        schools: updatedSchool,
      };

    case "resetSchoolSelection":
    default:
      return { ...initialSchoolState };
  }
};

const updateSchools = (dispatch) => (schools) =>
  dispatch({ type: "updateSchools", payload: schools });

const addSchools = (dispatch) => (school) =>
  dispatch({ type: "addSchools", payload: school });

const updateSelectedSchool = (dispatch) => (school) =>
  dispatch({ type: "updateSelectedSchool", payload: school });

const updateSelectedBatch = (dispatch) => (batch) =>
  dispatch({ type: "updateSelectedBatch", payload: batch });

const resetSchoolSelection = (dispatch) => () =>
    dispatch({ type: "resetSchoolSelection" });

const deleteSchool = (dispatch) => (schoolId) =>
    dispatch({ type: "deleteSchool", payload: schoolId });

  

export const { Context, Provider } = createContext(
  reducer,
  {
    updateSchools,
    updateSelectedSchool,
    updateSelectedBatch,
    resetSchoolSelection,
    deleteSchool,
    addSchools,
  },
  initialSchoolState
);

export function withSchools(Component) {
  return function contextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} schoolContext={context} />}
      </Context.Consumer>
    );
  };
}
