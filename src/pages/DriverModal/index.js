import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: '100%',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

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

  const nationalityOptions = nationalities || [];
  const teamOptions = teams || [];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Driver Modal"
      ariaHideApp={false}
      style={customStyles}
    >
      <h2>{driver ? 'Edit Driver' : 'Add Driver'}</h2>
      <form>
        <div class="form-group">
          <label>Driver Name:</label>
          <input type="text" className="form-control" name="driverNm" value={driverData.driverNm} onChange={handleInputChange} />
        </div>
        <div class="form-group">
          <label>Driver Age:</label>
          <input type="number" className="form-control" name="driverAge" value={driverData.driverAge} onChange={handleInputChange} />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Nationality:</label>
          <select className="form-control" name="nationalityID" value={driverData.nationalityID} onChange={handleInputChange}>
            <option value={0}>Select Nationality</option>
            {nationalityOptions.map((nationality) => (
              <option key={nationality.referenceValue} value={nationality.referenceValue}>
                {nationality.referenceLabel}
              </option>
            ))}
          </select>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Team:</label>
          <select className="form-control" name="teamID" value={driverData.teamID} onChange={handleInputChange}>
            <option value={0}>Select Team</option>
            {teamOptions.map((team) => (
              <option key={team.referenceValue} value={team.referenceValue}>
                {team.referenceLabel}
              </option>
            ))}
          </select>
        </div>
        <hr/>
        <button className="btn btn-primary mx-2" type="button" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-warning" type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default DriverModal;
