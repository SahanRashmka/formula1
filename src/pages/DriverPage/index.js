import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import DriverModal from '../DriverModal';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                const response = await api.getManufacturers();
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
            <div className="container">
                    <div className="row mt-2">
                        <span className="col-8">
                            <h1 className="heading inline">F2 Drivers 2023</h1>
                        </span>
                        <span className="col-4">
                            <button className='btn btn-primary' onClick={() => handleOpenModal()}>Add</button>
                        </span>
                    </div>
                    <div className="row mt-2">
                        <p className="text-justify">Check out this season's official F1 line-up. Full breakdown of drivers, points and current positions. Follow your favourite F1 drivers on and off the track. </p>
                    </div>
            </div>
            <div className="container">
                <div className="row">
                    {data.map((item) => {
                        const driverName = item.driverNm && typeof item.driverNm === 'string' ? item.driverNm : '';
                        const [fNm, lNm] = driverName.split(" ");
                        
                        return (
                            
                            <div key={item.driverID} className="card mx-2" Style="width: 18rem;">
                                <img className="card-img-top" alt=""/>
                                <div className="card-body">
                                    <h5 className="card-title">{fNm} {lNm}</h5>
                                    <p className="card-text">{item.teamNm}</p>
                                    <button onClick={() => handleOpenModal(item)} className="btn btn-sm btn-warning mx-1">Edit</button>
                                    <button onClick={() => handleDeleteDriver(item.driverID)} className="btn btn-sm btn-danger">Delete</button>
                                </div>
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
