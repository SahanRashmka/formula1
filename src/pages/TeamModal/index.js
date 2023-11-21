import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const TeamModal = ({ isOpen, onClose, onSave, team, manufacturers, drivers }) => {

    const [teamData, setTeamData] = useState({
        teamID: 0,
        teamNm: '',
        manufacturerID: 0,
        driverFirstID: 0,
        driverFirstNm: '',
        driverSecondID: 0,
        driverSecondNm: '',
        image: '',
        ...team,
    });

    useEffect(() => {
        setTeamData({
            teamID: 0,
            teamNm: '',
            manufacturerID: 0,
            driverFirstID: 0,
            driverFirstNm: '',
            driverSecondID: 0,
            driverSecondNm: '',
            image: '',
        ...team,
        });
    }, [isOpen, team]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeamData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onSave(teamData);
        onClose();
    };

    const manufacturerOptions = manufacturers || [];
    const driverOptions = drivers || [];

    return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Team Modal"
        ariaHideApp={false}
    >
        <h2>{team ? 'Edit Team' : 'Add Team'}</h2>
        <form>
          <label>
            Team Name:
            <input type="text" name="teamNm" value={teamData.teamNm} onChange={handleInputChange} />
          </label>
          <label>
            Manufacturer:
            <select name="manufacturerID" value={teamData.manufacturerID} onChange={handleInputChange}>
                <option value={0}>Select Manufacturer</option>
                {manufacturerOptions.map((manufacturer) => (
                <option key={manufacturer.referenceValue} value={manufacturer.referenceValue}>
                    {manufacturer.referenceLabel}
                </option>
                ))}
            </select>
          </label>
          <label>
            First Driver:
            <select name="driverFirstID" value={teamData.driverFirstID} onChange={handleInputChange}>
                <option value={0}>Select Driver</option>
                {driverOptions.map((driver) => (
                <option key={driver.referenceValue} value={driver.referenceValue}>
                    {driver.referenceLabel}
                </option>
                ))}
            </select>
          </label>
          <label>
            Second Driver:
            <select name="driverSecondID" value={teamData.driverSecondID} onChange={handleInputChange}>
                <option value={0}>Select Driver</option>
                {driverOptions.map((driver) => (
                <option key={driver.referenceValue} value={driver.referenceValue}>
                    {driver.referenceLabel}
                </option>
                ))}
            </select>
          </label>
          <label>
            Image:
            <input type="text" name="image" value={teamData.image} onChange={handleInputChange} />
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

export default TeamModal;