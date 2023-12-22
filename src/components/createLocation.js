import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CreateLocation() {
    // State variables to manage form input values
    const [title, setTitle] = useState('');
    const [stay, setStay] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [facilities, setFacilities] = useState('');

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a travel object with the form input values
        const travel = {
            title: title,
            stay: stay,
            rating: rating,
            description: description,
            facilities: facilities,
        };

        // Send a POST request to the API with the travel data
        axios.post('/api/travel', travel)
            .then(response => {
                // Check if the response status is successful and clear form inputs
                if (response.status === 200) {
                    // Navigate to the 'read' page after successful edit
                    navigate('/myTravel');
                }
            })
            .catch(error => {
                // Handle errors if needed
                console.error('Error submitting data:', error);
            });
    };

    return (
        <div>
            {/* Form to create a review */}
            <h2>Create a Review!</h2>
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
                    <label>Length of Stay: </label>
                    <input
                        type="text"
                        className="form-control"
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
                    <label>Facilities in Location (out of 10): </label>
                    <input
                        type="text"
                        className="control"
                        value={facilities}
                        onChange={(e) => { setFacilities(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Overall Rating (out of 10): </label>
                    <input
                        type="text"
                        className="control"
                        value={rating}
                        onChange={(e) => { setRating(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Review" />
                </div>
            </form>
        </div>
    );
}

export default CreateLocation;
