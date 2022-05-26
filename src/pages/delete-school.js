import appConfig from "../config/appConfig";
import { withSchools } from "../context/schoolNameContext";
import { deleteDocument } from "../firebase/fireStoreService";
import style from "../styles/DeleteSchool.module.css";

function DeleteSchool(props) {
  const { state: schoolState, dispatch: schoolActions } = props.schoolContext;
  const deleteSchool = (school) => {
    deleteDocument(appConfig.schoolDatabaseName, school.id)
      .then((res) => {
        console.log("Document deleted successfully");
        schoolActions.deleteSchool(school.id);
      })
      .catch((err) => {
        console.log("could not delete document", err);
      });
  };

  return schoolState.schools.map((school) => (
    <div key={school.id} className={style.schoolName}>
      {school.full_name} <span onClick={() => deleteSchool(school)}>X</span>
    </div>
  ));
}

export default withSchools(DeleteSchool);
