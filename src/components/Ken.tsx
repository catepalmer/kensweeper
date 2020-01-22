import React from 'react';
import ken from '../images/ken.jpg';
import '../sass/styles.scss';

const Ken = () => {
    return (
        <div className='ken'>
            <img src={ken} className='image--small'></img>
        </div>
    );
};

export default Ken;
