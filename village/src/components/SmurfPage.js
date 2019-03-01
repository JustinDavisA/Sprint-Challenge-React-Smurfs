import React from 'react';
import Smurf from './components/Smurf';

const SmurfPage = props => {
    const smurf = props.smurfs.find(smurf => `${smurf.id}` === props.match.params.id)
    if (!smurf) {
        return <h3>Loading items...</h3>;
    }
    return (
        <div>
            <Smurf 
            name={smurf.name}
            id={smurf.id}
            age={smurf.age}
            height={smurf.height}
            key={smurf.id}
            smurf={smurf}
            deleteSmurf={props.deleteSmurf}
            setUpdateForm={props.setUpdateForm}
            />
        </div>
    )
}

export default SmurfPage;