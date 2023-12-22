import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function TravelItem(props) {
  return (
    <div>
      <Card>
        <h4>{props.travel.title}</h4>
        <Card.Body>
          <h5>Stay: {props.travel.stay}</h5>
          <h5>Description: {props.travel.description}</h5>
          <h5>Facilities: {props.travel.facilities}</h5>
          <h5>Rating: {props.travel.rating}</h5>
        </Card.Body>
        <Link to={'/edit/'+props.travel._id} className='btn'>Edit</Link>
        <Button variant='danger' onClick={(e) => {
          e.preventDefault();
          // Send a delete request to the API to delete the travel item
          axios.delete('/api/travel/' + props.travel._id)
            .then((res) => {
              // Invoke the Reload function to refresh the data
              props.Reload();
            })
            .catch();
        }}>Delete</Button>
      </Card>
    </div>
  );
}

export default TravelItem;
