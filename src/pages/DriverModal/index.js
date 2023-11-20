import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const DriverModal = ({ isOpen, onClose, onSave, driver, nationalities, teams }) => {
  const [driverData, setDriverData] = useState({
    driverID: 0,
    driverNm: '',
    imageID: '',
    driverAge: 0,
    nationalityID: 0,
    nationalityNm: '',
    teamID: 0,
    teamNm: '',
    ...driver,
  });

  useEffect(() => {
    setDriverData({
      driverID: 0,
      driverNm: '',
      imageID: '',
      driverAge: 0,
      nationalityID: 0,
      nationalityNm: '',
      teamID: 0,
      teamNm: '',
      ...driver,
    });
  }, [isOpen, driver]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDriverData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(driverData);
    onClose();
  };

  const nationalityOptions = nationalities ? nationalities : [];
  const teamOptions = teams ? teams : [];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Driver Modal"
      ariaHideApp={false} // to suppress a11y warnings
    >
      <h2>{driver ? 'Edit Driver' : 'Add Driver'}</h2>
      <form>
        <label>
          Driver Name:
          <input type="text" name="driverNm" value={driverData.driverNm} onChange={handleInputChange} />
        </label>
        <label>
          Driver Age:
          <input type="number" name="driverAge" value={driverData.driverAge} onChange={handleInputChange} />
        </label>
        <label>
          Nationality:
          <select name="nationalityID" value={driverData.nationalityID} onChange={handleInputChange}>
            <option value={0}>Select Nationality</option>
            {nationalityOptions.map((nationality) => (
              <option key={nationality.referenceValue} value={nationality.referenceValue}>
                {nationality.referenceLabel}
              </option>
            ))}
          </select>
        </label>
        <label>
          Team:
          <select name="teamID" value={driverData.teamID} onChange={handleInputChange}>
            <option value={0}>Select Team</option>
            {teamOptions.map((team) => (
              <option key={team.referenceValue} value={team.referenceValue}>
                {team.referenceLabel}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default DriverModal;
