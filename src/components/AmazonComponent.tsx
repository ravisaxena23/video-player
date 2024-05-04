import React, { useEffect } from 'react';
import './css/amazon.css'
const AmazonComponent = (props: any) => {
    const { textLink, imgLink } = props;

    return (
        <div className='amazon-container'>
            <a href={textLink} target="_blank" rel="noopener noreferrer">
                <img src={imgLink} alt="Product Image" className='amazon-img'/>
            </a>
        </div>
    );
};

export default AmazonComponent;