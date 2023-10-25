import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
// import styles from './card.module.scss';

export type CardProps = {
  id?: number,
  src?: string;
  title: React.ReactNode;
  tag?: React.ReactNode;
  price?: number;
  chef?: string;
  onButtonClick?: React.MouseEventHandler;
  onImageClick?: React.MouseEventHandler;
};

const OneCard: React.FC<CardProps> = ({id, title, tag, price, src, chef, onButtonClick, onImageClick }) => {
  return (
    <Card style={{marginRight: '1%', marginLeft: '1%', width: 'auto'}}>
      <Link to={`/dishes/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <div style={{ backgroundColor: '#ffffff',
                      width: '400px',
                      borderRadius: '5px',
                      marginBottom: '10%',
                      boxShadow: '0 0 10px #3c3a3a'}}>
          <Image
            style={{  width: '70%', 
                      height: '313', 
                      marginTop: '5%'}}
            onClick={onImageClick}
            src={src ? src : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
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

        <h4 style={{fontFamily: 'sans-serif', marginLeft: '3%', fontWeight: '800', color: '#3c3a3a', fontSize: 'large', marginTop: '0', marginBottom: '5%'}}>{price}$</h4>
        <h4 style={{fontFamily: 'sans-serif', marginLeft: '3%', fontWeight: '100', marginTop: '2%', marginBottom: '2%'}}>{chef}</h4>
        <div className='mt-auto'>
          <Button style={{ backgroundColor: '#3D348B', padding: '10px 20px', borderColor: "#000" }} onClick={onButtonClick} variant="primary">Добавить</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OneCard;