import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import ResultModal from '../ResultModal';

const ResultPage = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [drivers, setDrivers] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cars, setCars] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await api.getResults();
            console.log(response);
            setData(response || []);
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

        const fetchCountries = async () => {
            try {
                const response = await api.getCountries();
                console.log(response);
                setCountries(response);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchCars = async () => {
            try {
                const response = await api.getCars();
                console.log(response);
                setCars(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        fetchDrivers();
        fetchCountries();
        fetchCars();
    }, []);

    const handleOpenModal = (result) => {
        setSelectedResult(result);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedResult(null);
        setIsModalOpen(false);
    };

    const handleDeleteResult = async (resultID) => {
        try{
            await api.deleteResult(resultID);
            
            // Fetch updated data after delete
            const response = await api.getResults();
            setData(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveResult = async (resultData) => {
        try {
            await api.saveResult(resultData);

            // Fetch updated data after save
            const response = await api.getResults();
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
                            <h1 className="heading inline">2023 RACE RESULTS</h1>
                        </span>
                        <span className="col-4">
                            <button className='btn btn-primary' onClick={() => handleOpenModal()}>Add</button>
                        </span>
                    </div>
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                            <th scope="col">Grand Prix</th>
                            <th scope="col">Winner</th>
                            <th scope="col">Car</th>
                            <th scope="col">Laps</th>
                            <th scope="col">Time</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                const winnerName = item.winnerNm && typeof item.winnerNm === 'string' ? item.winnerNm : '';
                                const [fNm, lNm] = winnerName.split(" ");
                                return (
                                    <tr key={item.raceID}>
                                        <td>
                                            {item.grandPixNm}
                                        </td>
                                        <td>
                                            {fNm + " "}
                                            {lNm}
                                        </td>
                                        <td>{item.carNm}</td>
                                        <td>{item.laps}</td>
                                        <td>{item.winnerTime}</td>
                                        <td>
                                            <button onClick={() => handleOpenModal(item)} className="btn btn-sm btn-warning mx-1">Edit</button>
                                            <button onClick={() => handleDeleteResult(item.raceID)} className="btn btn-sm btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
        </div>
        <ResultModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveResult}
            result={selectedResult}
            drivers={drivers}
            countries={countries}
            cars={cars}
        />
        </>
        
    );
};

export default ResultPage;
