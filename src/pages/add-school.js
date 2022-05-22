import { useState, useEffect } from "react";
import appConfig from "../config/appConfig";
import { withSchools } from "../context/schoolNameContext";
import { addDocument } from "../firebase/firebaseService";
import styles from "../styles/AddSchool.module.css";

export function AddSchool(props) {
  const { state: schoolState, dispatch: schoolActions } = props.schoolContext;
  const [formData, setFormData] = useState({});
  const [fullName, setFullName] = useState("");
  const [shortName, setShortName] = useState("");
  const [batchName, setBatchName] = useState("");

  useEffect(() => {
    setFormData({
      ...formData,
      full_name: fullName,
      short_form: shortName,
      batches: [batchName],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullName, shortName, batchName]);

  const resetForm = () => {
    setFullName("");
    setShortName("");
    setBatchName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument(appConfig.schoolDatabaseName, formData)
      .then((res) => {
        console.log("data added successfully: document id : ", res.id);
        resetForm();
        schoolActions.addSchools({...formData, id: res.id});
      })
      .catch((err) => console.log(err));
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.add_school_form}>
        <label htmlFor="full_name">School Name</label>
        <input
          type="text"
          name="full_name"
          id="full_name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label htmlFor="short_form">
          Any short form you call your school as
        </label>
        <input
          type="text"
          name="short_form"
          id="short_form"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
        />
        <label htmlFor="batches">Batch year</label>
        <input
          type="number"
          name="batches"
          id="batches"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
        />
        <input type="reset" value="Reset the form" onClick={resetForm} />
        <input type="submit" value="Add your school to database" />
      </form>
      <div>
        <h2>Schools already present in database are:</h2>
        {schoolState.schools.map((school) => (
          <div key={school.id}>{school.full_name}</div>
        ))}
      </div>
    </div>
  );
}

export default withSchools(AddSchool);
