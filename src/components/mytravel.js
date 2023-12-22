import { useEffect, useState } from "react"
import Travel from './travelIteam'
import axios from "axios";

function MyTravel() {
    const [travel, setTravel] = useState(null); // State to hold travel data

    // Fetch travel data from the API
    useEffect(() => {
        // Using a proxy during development in package.json
        axios.get('/api/travel')
            .then((response) => {
                setTravel(response.data); // Set the fetched travel data
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // Empty dependency array to run the effect only once

    // Function to reload/fetch travel data
    const Reload = (e) => {
        axios.get('/api/travel')
            .then((response) => {
                setTravel(response.data); // Set the fetched travel data
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="read">
            <div className="travel">
                {/* Render the travel items if travel data is available */}
                {travel && travel.map((item) => (
                    <Travel key={item._id} travel={item} />
                ))}
            </div>
        </div>
    )
}

export default MyTravel;
