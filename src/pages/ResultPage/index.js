import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const ResultPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await api.getResults();
            console.log(response);
            setData(response);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
    }, []);

    return (
        <div className="resultsarchive-wrapper">
            <div className="resultsarchive-content">
                <div className="resultsarchive-content-header">
                    <h1 className="ResultsArchiveTitle">
                        2023 RACE RESULTS
                    </h1>
                </div>
                <div className="table-wrap">
                    <table className="resultsarchive-table">
                        <thead>
                            <tr>
                                <th className="limiter"></th>
                                <th>Grand Prix</th>
                                <th>Winner</th>
                                <th>Car</th>
                                <th className="hide-for-mobile">Laps</th>
                                <th className="hide-for-tablet">Time</th>
                                <th className="limiter"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                const winnerName = item.winnerNm && typeof item.winnerNm === 'string' ? item.winnerNm : '';
                                const [fNm, lNm] = winnerName.split(" ");
                                return (
                                    <tr key={item.raceID}>
                                        <td className="limiter"></td>
                                        <td className="dark bold">
                                            {item.grandPixNm}
                                        </td>
                                        <td className="dark bold">
                                            <span className="hide-for-tablet">{fNm}</span>
                                            <span className="hide-for-mobile">{lNm}</span>
                                        </td>
                                        <td className="semi-bold uppercase ">{item.carNm}</td>
                                        <td className="bold hide-for-mobile">{item.laps}</td>
                                        <td className="dark bold hide-for-tablet">{item.winnerTime}</td>
                                        <td className="limiter"></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
