import React, { useState, useEffect } from "react"; 
import axios from "axios"; 

const Location = () => {
    const [ip, setIp] = useState(null); // State for IP address
    const [geoData, setGeoData] = useState(null); // State for geolocation data

    // Fetch IP address
    const fetchIpAddress = async () => {
        try {
            const response = await axios.get("https://api.ipify.org?format=json");
            setIp(response.data.ip);
        } catch (error) {
            console.error("Error fetching IP address:", error.message);
        }
    };

    // Fetch geolocation data
    const getGeoLocationData = async () => {
        if (!ip) return; // Ensure IP is available
        try {
            const response = await axios.get(
                `https://geo.ipify.org/api/v2/country?apiKey=at_zMMOOZfmfSFkouj8Z9ZgB63ikPysY&ipAddress=${ip}`
            );
            setGeoData(response.data);
        } catch (error) {
            console.error("Error fetching geolocation data:", error.message);
        }
    };

    // Fetch IP address when component is mounted
    useEffect(() => {
        fetchIpAddress();
    }, []);

    // Fetch geolocation data once IP is available
    useEffect(() => {
        if (ip) {
            getGeoLocationData();
        }
    }, [ip]);

    return (
        <div className="location">
            {ip ? <p>IP Address: {ip}</p> : <p>Loading IP address...</p>}
            {geoData ? (
                <div>
                    <p>Country: {geoData.location.country}</p>
                    <p>Region: {geoData.location.region}</p>
                </div>
            ) : (
                <p>Loading Geolocation Data...</p>
            )}
        </div>
    );
};

export default Location;
