import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const defaultImgSrc = '/images/placeholderImage.jpg';
const initialFieldValues = {
    teamID:0,
    teamNm:'',
    imageNm:'',
    imageSrc:defaultImgSrc,
    imageFile:null
}
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
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});


    const [teamData, setTeamData] = useState({
        teamID: 0,
        teamNm: '',
        manufacturerID: 0,
        driverFirstID: 0,
        driverFirstNm: '',
        driverSecondID: 0,
        driverSecondNm: '',
        imageName:'',
        imageSrc: defaultImgSrc,
        imageFile: null,
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
            imageName: values.imageNm,
            imageSrc: values.imageSrc,
            imageFile: values.imageFile,
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

    const showPreview = e => {
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x =>{
                setValues({                                    
                    ...values,
                    imageFile: imageFile,
                    imageSrc: x.target.result,    
                })
            }
            reader.readAsDataURL(imageFile);
        }
        else{
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImgSrc

            });
        }
    }

    const validate = () => {
        let temp ={};
        temp.imageSrc = values.imageSrc === ''?false:true;
        setErrors(temp);
        return Object.values(temp).every(x => x === true);
    }
    const applyErrorClass = field => ((field in errors && errors[field] === false) ? 'invalid-field' : '')
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Team Modal"
            ariaHideApp={false}
            style={customStyles}
        >
            <h2 className='header'>{team ? "Edit Team" : "Add Team"}</h2>
            <form>
                <div className="form-group row my-1">
                    <label className='col-sm-3 col-form-label'>Team Name:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            className="form-control"
                            name="teamNm"
                            value={teamData.teamNm}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-group row my-1">
                    <label className='col-sm-3 col-form-label'>Manufacturer:</label>
                    <div className="col-sm-9">
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
                </div>
                <div className="form-group row my-1">
                    <label className='col-sm-3 col-form-label'>First Driver:</label>
                    <div className="col-sm-9">
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
                </div>
                <div className="form-group row my-1">
                    <label className='col-sm-3 col-form-label'>Second Driver:</label>
                    <div className="col-sm-9">
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
                </div>
                <div className="form-group row my-1">
                    <div className="col-sm-5">
                        <input type="file" accept='image/*' className={'form-control-file invalid-field' + applyErrorClass('imageSrc')} onChange={showPreview}/>
                    </div>
                    <div className="col-sm-7">
                        <img src={values.imageSrc} alt='uploaded' style={{width:'100%', height:'15rem'}}/>
                    </div>
                </div>
                <hr />
                <button className="btn btn-primary mx-2" onClick={handleSave}>
                    Save
                </button>
                <button className="btn btn-warning" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default TeamModal;