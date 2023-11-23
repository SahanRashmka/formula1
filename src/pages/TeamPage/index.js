import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import TeamModal from '../TeamModal';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                setData(response || []);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchManufacturers = async () => {
            try {
                const response = await api.getManufacturers();
                setManufacturers(response || []);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchDrivers = async () => {
            try {
                const response = await api.getDriverData();
                setDrivers(response || []);
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
        try {
            await api.deleteTeam(teamID);

            // Fetch updated data after delete
            const response = await api.getTeams();
            setData(response || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveTeam = async (teamData) => {
        try {
            await api.saveTeam(teamData);

            // Fetch updated data after save
            const response = await api.getTeams();
            setData(response || []);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row mt-2">
                    <span className="col-8">
                        <h1 className="heading inline">F1 Teams 2023</h1>
                    </span>
                    <span className="col-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleOpenModal()}
                        >
                            Add
                        </button>
                    </span>
                </div>
            </div>
            <div className="row mt-2">
                <p className="text-justify">
                    Discover everything you need to know about this year's Formula 1
                    teams - drivers, podium finishes, points earned and championship
                    titles.
                </p>
            </div>
            <div className="container">
                <div className="row">
                    {data.map((item) => {
                        const frstDriverNm =
                            item.dirverFirstNm && typeof item.dirverFirstNm === "string"
                                ? item.dirverFirstNm
                                : "";
                        const [fdFNm, fdLNm] = frstDriverNm.split(" ");
                        const scndDriverNm =
                            item.driverSecondNm && typeof item.driverSecondNm === "string"
                                ? item.driverSecondNm
                                : "";
                        const [sdFNm, sdLNm] = scndDriverNm.split(" ");
                        return (
                            <div
                                key={item.teamID}
                                className="card mx-2"
                                style={{width: "18rem"}}
                            >
                                <img className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.teamNm}</h5>
                                    <p className="card-text">
                                        {fdFNm} {fdLNm}
                                    </p>
                                    <p className="card-text">
                                        {sdFNm} {sdLNm}
                                    </p>
                                    <button onClick={() => handleOpenModal(item)}  className="btn btn-sm btn-warning mx-1"> 
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteTeam(item.teamID)}  className="btn btn-sm btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
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
