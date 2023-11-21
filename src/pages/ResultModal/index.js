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

const ResultModal = ({ isOpen, onClose, onSave, result, drivers, countries, cars }) => {
  const [resultData, setResultData] = useState({
    raceID: 0,
    winnerID: 0,
    winnerNm: '',
    winnerTime: '',
    grandPixID: 0,
    grandPixNm: '',
    laps: 0,
    carID: 0,
    carNm: '',
    ...result,
  });

  useEffect(() => {
    setResultData({
      raceID: 0,
      winnerID: 0,
      winnerNm: '',
      winnerTime: '',
      grandPixID: 0,
      grandPixNm: '',
      laps: 0,
      carID: 0,
      carNm: '',
      ...result,
    });
  }, [isOpen, result]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResultData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(resultData);
    onClose();
  };

  const driverOptions = drivers || [];
  const countryOptions = countries || [];
  const carOptions = cars || [];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Result Modal"
      ariaHideApp={false}
      style={customStyles}
    >
      <h2>{result ? 'Edit Result' : 'Add Result'}</h2>
      <form>
        <div className="form-group">
          <label>Winner:</label>
          <select className="form-control" name="winnerID" value={resultData.winnerID} onChange={handleInputChange}>
            <option value={0}>Select Driver</option>
            {driverOptions.map((driver) => (
              <option key={driver.referenceValue} value={driver.referenceValue}>
                {driver.referenceLabel}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input type="text" className="form-control" name="winnerTime" value={resultData.winnerTime} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Grand Prix:</label>
          <select className="form-control" name="grandPixID" value={resultData.grandPixID} onChange={handleInputChange}>
            <option value={0}>Select Grand Prix</option>
            {countryOptions.map((country) => (
              <option key={country.referenceValue} value={country.referenceValue}>
                {country.referenceLabel}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Laps:</label>
          <input type="text" className="form-control" name="laps" value={resultData.laps} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Car:</label>
          <select className="form-control" name="carID" value={resultData.carID} onChange={handleInputChange}>
            <option value={0}>Select Car</option>
            {carOptions.map((car) => (
              <option key={car.referenceValue} value={car.referenceValue}>
                {car.referenceLabel}
              </option>
            ))}
          </select>
        </div>
        <hr />
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

export default ResultModal;
