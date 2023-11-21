import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import TeamModal from '../TeamModal';

const TeamPage = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [manufacturers, setManufacturers] = useState([]);
    const [drivers, setDrivers] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await api.getTeams();
            console.log(response);
            setData(response);
        } catch (error) {
            console.error(error);
        }
        };

        const fetchManufacturers = async () => {
            try {
                const response = await api.getManufacturers();
                console.log(response);
                setManufacturers(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchDrivers = async () => {
            try {
                const response = await api.getDriverData();
                console.log(response);
                setDrivers(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchManufacturers();

        fetchData();

        fetchDrivers();

    }, []);

    const handleOpenModal = (team) => {
        setSelectedTeam(team);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedTeam(null);
        setIsModalOpen(false);
    };

    const handleDeleteTeam = async (teamID) => {
        try{
            await api.deleteTeam(teamID);
            
            // Fetch updated data after delete
            const response = await api.getTeams();
            setData(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveTeam = async (teamData) => {
        try {
            await api.saveTeam(teamData);

            // Fetch updated data after save
            const response = await api.getTeams();
            setData(response);
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <>
            <div>
                <div className="container">
                <div className="row mt-2">
                        <span className="col-8">
                            <h1 className="heading inline">F1 Teams 2023</h1>
                        </span>
                        <span className="col-4">
                            <button className='btn btn-primary' onClick={() => handleOpenModal()}>Add</button>
                        </span>
                    </div>
                </div>
                <div className="container listing-seo-wrapper">
                    <div className="seo-content">
                        <div className="row">
                                <div className="col-12 col-md-9 col-lg-8 col-xl-6">
                                    
                                    <p className="no-margin text--micro">Discover everything you need to know about this year's Formula 1 teams - drivers, podium finishes, points earned and championship titles.</p>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="container listing team-listing">
                    <div className="row">
                        {data.map((item) => {
                            const frstDriverNm = item.dirverFirstNm && typeof item.dirverFirstNm === 'string' ? item.dirverFirstNm : '';
                            const [fdFNm, fdLNm] = frstDriverNm.split(" ");
                            const scndDriverNm = item.driverSecondNm && typeof item.driverSecondNm === 'string' ? item.driverSecondNm : '';
                            const [sdFNm, sdLNm] = scndDriverNm.split(" ");
                            return (
                                <div key={item.teamID} className="col-12 col-md-6">
                                    <fieldset className="listing-item-wrapper">
                                        <div className="listing-item">
                                            <div className="listing-info"   >
                                                <div className="name f1-bold--m">
                                                    <span className="team-color-bar "></span>
                                                    <span className="f1-color--black">{item.teamNm}</span>
                                                </div>
                                            </div>
                                            <div className="listing-team-drivers">
                                                <div className="driver">
                                                    <div className="driver-info ">
                                                        <span className="first-name f1--xs d-block d-lg-inline">{fdFNm}</span>
                                                        <span className="last-name f1-uppercase f1-bold--xs d-block d-lg-inline">{fdLNm}</span>
                                                    </div>
                                                    <div className="driver-image d-none d-xl-block">
                                                    </div>
                                                </div>
                                            
                                                <div className="driver">
                                                    <div className="driver-info ">
                                                        <span className="first-name f1--xs d-block d-lg-inline">{sdFNm}</span>
                                                        <span className="last-name f1-uppercase f1-bold--xs d-block d-lg-inline">{sdLNm}</span>
                                                    </div>
                                                    <div className="driver-image d-none d-xl-block">
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="listing-image">
                                            </div>
                                        </div>
                                        <button onClick={() => handleOpenModal(item)}>Edit</button>
                                        <button onClick={() => handleDeleteTeam(item.teamID)}>Delete</button>
                                    </fieldset>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <TeamModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveTeam}
                team={selectedTeam}
                manufacturers={manufacturers}
                drivers={drivers}
            />
        </>
    );
};

export default TeamPage;
