import TravelItem from "./travelItem";

function travel(props) {
    // Map through the props.traveling array to render each travel item
    return props.traveling.map((travel) => (
        <TravelItem 
            traveling={travel} // Pass the travel object as a prop to the TravelItem component
            key={travel._id} // Unique key prop to help React efficiently render the list
            Reload={() => { props.ReloadData(); }} // Pass down a function ReloadData as a prop to trigger a reload
        />
    ));
}

export default travel;
