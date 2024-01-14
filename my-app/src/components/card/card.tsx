import React from 'react';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
// import styles from './card.module.scss';

export type CardProps = {
  id?: number,
  url?: string;
  title: React.ReactNode;
  tag?: React.ReactNode;
  price?: number;
  chef?: string;
  onButtonClick?: React.MouseEventHandler;
  onImageClick?: React.MouseEventHandler;
};

const OneCard: React.FC<CardProps> = ({id, title, tag, price, url, chef, onImageClick }) => {
  return (
    <Card style={{marginRight: '3%', marginLeft: '3%', width: '345px', boxShadow: '0 0 10px #3c3a3a'}}>
      <Link to={`/dishes/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <div style={{ backgroundColor: '#ffffff',
                      width: '345px',
                      borderRadius: '5px',
                      marginBottom: '0%'}}>
          <Image
            style={{  width: '70%', 
                      height: '313', 
                      marginTop: '5%'}}
            onClick={onImageClick}
            src={url ? url : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
          />
        </div>
      </Link>
      <Card.Body style={{backgroundColor: '#FFD639', 
                      color: '#3c3a3a', 
                      borderRadius: '0 0 5px 5px', 
                      height: 'auto',}}>
        <div style={{ display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start', 
                      width: '100%', 
                      height: '100%',
                      margin: '0'}}>
            <p style={{fontFamily: 'sans-serif',
                      fontWeight: '500', 
                      fontSize: 'larger', 
                      marginLeft: '3%',
                      marginBottom: '1%'
              }} >{title}</p>   
            <h5 style={{fontFamily: 'sans-serif', backgroundColor: '#f53100', color: 'white', fontWeight: '800', right: '0', margin: '5px', padding: '3px 15px 3px', borderRadius: '5px'}}>{tag}</h5>         
        </div>

        <h4 style={{fontFamily: 'sans-serif', marginLeft: '3%', fontWeight: '800', color: '#3c3a3a', fontSize: 'large', marginTop: '0', marginBottom: '0%', textAlign: 'center'}}>{price}$</h4>
        <h4 style={{fontFamily: 'sans-serif', marginLeft: '3%', fontWeight: '100', marginTop: '2%', marginBottom: '2%', textAlign: 'center'}}>{chef}</h4>
        {/* <div style={{textAlign: 'right', marginRight: '5px'}}>
          <Button style={{padding: '10px 20px', marginBottom: "5px"}} onClick={onButtonClick} variant="primary">+</Button>
        </div>
         */}
      </Card.Body>
    </Card>
  );
};

export default OneCard;

// #f53100 red
// #00AF54 green