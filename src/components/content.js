import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    // State to manage the search query and items fetched from the API
    const [query, setQuery] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch items from the API endpoint using Axios when the component mounts
        axios.get("/api/travel") 
            .then(response => {
                setItems(response.data); 
            })
            .catch(error => {
                console.error("Error fetching items:", error);
            });
    }, []); // Empty dependency array to run the effect only once on component mount

    // Function to filter items based on the search query
    const getFilteredItems = () => {
        if (!query) {
            return items; // Return all items if query is empty
        } else {
            return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
            // Filter items by checking if the title includes the query
        }
    };

    // Get the filtered items based on the search query
    const filteredItems = getFilteredItems();

    return (
        <div className="home">
            {/* Input field for users to enter the search query */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title..."
            />
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>Stay: {item.stay}</p>
                        <p>Rating: {item.rating}</p>
                        <p>Description: {item.description}</p>
                        <p>Facilities: {item.facilities}</p>
                    </li>
                    
                ))}
            </ul>
        </div>
    );
}

export default Home;
