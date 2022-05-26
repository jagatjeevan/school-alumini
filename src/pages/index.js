import Link from "next/link";
import appConfig from "../config/appConfig";
import { withSchools } from "../context/schoolNameContext";
import { getDocumentsOf } from "../firebase/fireStoreService";
import styles from "../styles/Home.module.css";

const AddSchoolButton = () => (
  <div><Link href="/add-school">Add a school</Link></div>
);

export function Home(props) {
  const { state: schoolState, dispatch: schoolDispatch } = props.schoolContext;

  const showSchools = () => {
    getDocumentsOf(appConfig.schoolDatabaseName).then((res) => schoolDispatch.updateSchools(res));
  };

  const updateSelectedSchool = (schoolObj) => {
    if (schoolState.selectedSchool !== schoolObj.id) schoolDispatch.updateSelectedSchool(schoolObj);
  };

  const getSchools = () =>
    schoolState.schools.map((item) => (
      <div
        key={item.id}
        className={styles.school_list}
        onClick={() => updateSelectedSchool(item)}
      >
        {item.full_name} : {item.short_form}
      </div>
    ));

  const getBatches = () => {
    if (!Object.keys(schoolState.selectedSchool).length)
      return "Select a school to proceed";

    if (!schoolState.selectedSchool.batches.length)
      return "No batches present for the school";

    const selectedSchoolId = schoolState.selectedSchool.id;
    return schoolState.selectedSchool.batches.map((batch, index) => {
      const keyValue = `${selectedSchoolId}-${index}`;
      return (
        <div className="school_names" key={keyValue}>
          {batch}
        </div>
      );
    });
  };

  if (!schoolState.schools.length) {
    return (
      <>
        <button onClick={showSchools}>Show Schools</button>
        <AddSchoolButton />
      </>
    );
  }

  return (
    <>
      <div>{getSchools()}</div>
      <AddSchoolButton />
      <div>Selected School : {schoolState.selectedSchool.full_name}</div>
      {getBatches()}
    </>
  );
}


export default withSchools(Home);