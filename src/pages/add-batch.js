import { useState } from "react";
import appConfig from "../config/appConfig";
import { withSchools } from "../context/schoolNameContext";
import { getDocumentsOf, updateDocumentField } from "../firebase/fireStoreService";
import style from '../styles/AddBatch.module.css'

function AddBatch(props) {
  const { state: schoolState, dispatch: schoolDispatch } = props.schoolContext;
  const [schools, setSchools] = useState(schoolState.schools);
  const [selectedSchool, setSelectedSchool] = useState({});
  const [newBatch, setNewBatch] = useState('');

  const getBatch = () => {
    if (!selectedSchool.id) return null;

    return selectedSchool.batches.map((item) => (
      <div className={style.batch} key={`${selectedSchool.id}-${item}`}>
        {item}
      </div>
    ));
  };

  const handleAddBatch = (e) => {
      e.preventDefault();
      const updatedBatches = [...selectedSchool.batches, newBatch];
      updateDocumentField(appConfig.schoolDatabaseName, selectedSchool.id, {batches: updatedBatches}).then(res => {
        getDocumentsOf(appConfig.schoolDatabaseName).then((res) => {
          schoolDispatch.updateSchools(res)
          setSchools(res);
        });
      }).catch(err => {
        console.log("err", err)
      })
  }

  const resetAddBatch = () => {
      setNewBatch('');
  }

  const addBatch = () => {
      if (!selectedSchool.id) return null;
      return (
          <form onSubmit={handleAddBatch}>
              <label htmlFor="addBatch">Add batch</label>
              <input type="number" name="addBatch" id="addBatch" value={newBatch} onChange={(e) => setNewBatch(e.target.value)} />
              <input type="submit" value="Add batch" />
              <input type="reset" value="Reset Batch" onClick={resetAddBatch} />
          </form>
      )
  }

  return (
    <>
      <h2>Select a school to proceed : {selectedSchool.full_name}</h2>
      {schools.map((school) => (
        <div key={school.id} onClick={() => setSelectedSchool(school)}>
          {school.full_name}
        </div>
      ))}
      <hr />
      {getBatch()}
      {addBatch()}
    </>
  );
}

export default withSchools(AddBatch);
