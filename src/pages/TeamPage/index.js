import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const TeamPage = () => {
    const [data, setData] = useState([]);

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

        fetchData();
    }, []);

    return (
        <>
            <div className="container listing-header">
                <fieldset className="f1-border--top-right f1-border-color--carbonBlack">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="f1-black--xxl no-margin">F1 Teams 2023</h1>
                            
                        </div>
                    </div>
                </fieldset>
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
                            <div key={item.teamId} className="col-12 col-md-6">
                                <fieldset className="listing-item-wrapper">
                                    <div className="listing-item">
                                        <div className="listing-info"   >
                                            <div className="name f1-bold--m">
                                                <span className="team-color-bar "></span>
                                                <span className="f1-color--black">{item.teamNm }</span>
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
                                </fieldset>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default TeamPage;
