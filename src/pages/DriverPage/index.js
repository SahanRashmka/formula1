import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import DriverModal from '../DriverModal';

const DriverPage = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [nationalities, setNationalities] = useState([]);
    const [teams, setTeams] = useState([]);
  
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await api.getDrivers();
                console.log(response);
                setData(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchNationalities = async () => {
            try {
                const response = await api.getNationalities();
                console.log(response);
                setNationalities(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchTeams = async () => {
            try {
                const response = await api.getTeamData();
                console.log(response);
                setTeams(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNationalities();

        fetchData();

        fetchTeams();

    }, []);

    const handleOpenModal = (driver) => {
        setSelectedDriver(driver);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedDriver(null);
        setIsModalOpen(false);
    };

    const handleDeleteDriver = async (driverId) => {
        try{
            await api.deleteDriver(driverId);
            
            // Fetch updated data after delete
            const response = await api.getDrivers();
            setData(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveDriver = async (driverData) => {
        try {
            await api.saveDriver(driverData);

            // Fetch updated data after save
            const response = await api.getDrivers();
            setData(response);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <>
            <div className="container listing-header">
                <fieldset className="f1-border--top-right f1-border-color--carbonBlack">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="f1-black--xxl no-margin">F1 Drivers 2023</h1>
                            <button onClick={() => handleOpenModal()}>Add</button>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="container listing-seo-wrapper">
                <div className="seo-content">
                    <div className="row">
                        <div className="col-12 col-md-9 col-lg-8 col-xl-6">
                            
                            <p className="no-margin text--micro">Check out this season's official F1 line-up. Full breakdown of drivers, points and current positions. Follow your favourite F1 drivers on and off the track. </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container listing-items--wrapper driver during-season">
                <div className="row">
                    {data.map((item) => {
                        const driverName = item.driverNm && typeof item.driverNm === 'string' ? item.driverNm : '';
                        const [fNm, lNm] = driverName.split(" ");
                        
                        return (
                            <div key={item.driverID} className="col-12 col-md-6 col-lg-4 col-xl-3">    
                                <fieldset className="f1-border--top-right f1-border--double listing-item--border">
                                    <div className="container">
                                        <div className="row justify-content-between align-items-center listing-item--head">
                                            <div className="col-xs-8 listing-item--name f1-uppercase ">
                                                <span className="d-block f1--xxs f1-color--carbonBlack">{fNm}</span>
                                                <span className="d-block f1-bold--s f1-color--carbonBlack">{lNm}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="listing-item--team f1--xxs f1-color--gray5">{item.teamNm}</p>
                                    <button onClick={() => handleOpenModal(item)}>Edit</button>
                                    <button onClick={() => handleDeleteDriver(item.driverID)}>Delete</button>
                                </fieldset>
                            </div>
                        )
                    })}
                </div>
            </div>
            <DriverModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveDriver}
                driver={selectedDriver}
                nationalities={nationalities}
                teams={teams}
            />
        </>
    );
};

export default DriverPage;
