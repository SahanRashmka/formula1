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
            style={customStyles}
        >
            <h2>{team ? "Edit Team" : "Add Team"}</h2>
            <form>
                <div className="form-group">
                    <label>Team Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="teamNm"
                        value={teamData.teamNm}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Manufacturer:</label>
                    <select
                        className="form-control"
                        name="manufacturerID"
                        value={teamData.manufacturerID}
                        onChange={handleInputChange}
                    >
                        <option value={0}>Select Manufacturer</option>
                        {manufacturerOptions.map((manufacturer) => (
                            <option
                                key={manufacturer.referenceValue}
                                value={manufacturer.referenceValue}
                            >
                                {manufacturer.referenceLabel}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>First Driver:</label>
                    <select
                        className="form-control"
                        name="driverFirstID"
                        value={teamData.driverFirstID}
                        onChange={handleInputChange}
                    >
                        <option value={0}>Select Driver</option>
                        {driverOptions.map((driver) => (
                            <option
                                key={driver.referenceValue}
                                value={driver.referenceValue}
                            >
                                {driver.referenceLabel}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Second Driver:</label>
                    <select
                        className="form-control"
                        name="driverSecondID"
                        value={teamData.driverSecondID}
                        onChange={handleInputChange}
                    >
                        <option value={0}>Select Driver</option>
                        {driverOptions.map((driver) => (
                            <option
                                key={driver.referenceValue}
                                value={driver.referenceValue}
                            >
                                {driver.referenceLabel}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="image"
                        value={teamData.image}
                        onChange={handleInputChange}
                    />
                </div>
                <hr />
                <button className="btn btn-primary mx-2" onClick={handleSave}>
                    Save
                </button>
                <button className="btn btn-warning" type="button" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default TeamModal;