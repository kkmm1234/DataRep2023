import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditLocation() {
    let { id } = useParams(); // ID parameter from the URL

    // State variables to manage form input values
    const [title, setTitle] = useState('');
    const [stay, setStay] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [facilities, setFacilities] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the specific travel item based on the ID
        axios.get('/api/travel/' + id)
            .then((response) => {
                //Set state with the retrieved data
                setTitle(response.data.title);
                setStay(response.data.stay);
                setRating(response.data.rating);
                setDescription(response.data.description);
                setFacilities(response.data.facilities);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]); //Dependency array to rerun the effect when the id parameter changes

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a travel object with updated form input values
        const travel = {
            title: title,
            stay: stay,
            rating: rating,
            description: description,
            facilities: facilities
        };

        // Send a PUT request to update the specific travel item based on the ID
        axios.put('/api/travel/' + id, travel)
            .then((res) => {
                // Navigate to the 'read' page after successful edit
                navigate('/myTravel');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {/* Form to edit a review */}
            <h2>Edit your Review!</h2>
            <form onSubmit={handleSubmit}>
                <div className="group">
                    <label>Add Location: </label>
                    <input
                        type="text"
                        className="control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Length of stay: </label>
                    <input
                        type="text"
                        className="fcontrol"
                        value={stay}
                        onChange={(e) => { setStay(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Description: </label>
                    <input
                        type="text"
                        className="control"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Facilities in location (out of 10): </label>
                    <input
                        type="text"
                        className="control"
                        value={facilities}
                        onChange={(e) => { setFacilities(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Overall rating (out of 10): </label>
                    <input
                        type="text"
                        className="control"
                        value={rating}
                        onChange={(e) => { setRating(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Edit Review" />
                </div>
            </form>
        </div>
    );
}
