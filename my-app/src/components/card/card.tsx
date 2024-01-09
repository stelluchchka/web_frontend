import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useIsAuth, useUser } from '../../slices/authSlice';
// import styles from './card.module.scss';

export type CardProps = {
  id?: number,
  url?: string;
  title: React.ReactNode;
  tags?: React.ReactNode;
  price?: number;
  chef?: string;
  onPlusButtonClick?: React.MouseEventHandler;
  onPutButtonClick?: React.MouseEventHandler;
  onDelButtonClick?: React.MouseEventHandler;
  onImageClick?: React.MouseEventHandler;
};

const OneCard: React.FC<CardProps> = ({id, title, tags, price, url, chef, onPlusButtonClick, onPutButtonClick, onDelButtonClick, onImageClick }) => {
  const user = useUser();
  const isAuth = useIsAuth();
  return (
    <Card style={{marginRight: '3%', marginLeft: '3%', width: '27%', boxShadow: '0 0 10px #3c3a3a'}}>
      { id != 0 ? 
      <Link to={`/dishes/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <div style={{ backgroundColor: '#ffffff',
                      width: '100%',
                      borderRadius: '5px',
                      marginBottom: '0%'}}>
          <Image
            style={{  width: '80%', 
                      // height: '100%', 
                      marginTop: '5%'}}
            onClick={onImageClick}
            src={url ? url : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
          />
        </div>
      </Link>
      :
      <Link to={`/dishes/${id}`}  style={{ textDecoration: 'none', color: 'black' }}>
        <div style={{ backgroundColor: '#ffffff',
                      width: '100%',
                      borderRadius: '5px',
                      marginBottom: '0%'}}>
          <Image
            style={{  width: '80%', 
                      // height: '100%', 
                      marginTop: '5%'}}
            onClick={onImageClick}
            src={url ? url : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
          />
        </div>
      </Link>
      }
      <Card.Body style={{backgroundColor: '#FFD639', 
                      color: '#3c3a3a', 
                      borderRadius: '0 0 5px 5px', 
                      height: 'auto'}}>
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
            {id != 0 && tags != null && tags != '' &&
              <h5 style={{fontFamily: 'sans-serif', backgroundColor: '#f53100', color: 'white', fontWeight: '800', right: '0', margin: '5px', padding: '3px 15px 3px', borderRadius: '5px'}}>{tags}</h5>         
            }
            </div>

        { id != 0 ?
          <h4 style={{fontFamily: 'sans-serif', marginLeft: '3%', fontWeight: '800', color: '#3c3a3a',fontSize: 'large', marginTop: '0', marginBottom: '0%', textAlign: 'center'}}>{price}₽</h4>
        :
        <br/>
        }
          <h4 style={{fontFamily: 'sans-serif', marginLeft: '3%', fontWeight: '100', marginTop: '2%', marginBottom: '2%', textAlign: 'center'}}>{chef}</h4>
        {isAuth && !user.isSuperuser &&
          <div style={{textAlign: 'right', marginRight: '5px'}}>
            <br />
            <Button style={{padding: '0px 0px', marginBottom: "5px", height: "40px", width: "40px"}} onClick={onPlusButtonClick} variant="primary">+</Button>
          </div>          
        }
        {user.isSuperuser && id != 0 &&
          <div style={{textAlign: 'right', marginRight: '5px'}}>
            <br />
            <Button style={{padding: '0px 0px', marginBottom: "5px", marginRight: "5px", height: "40px", width: "40px"}} onClick={onPutButtonClick} variant="primary">✏️</Button>
            <Button style={{padding: '0px 0px', marginBottom: "5px", height: "40px", width: "40px"}} onClick={onDelButtonClick} variant="primary">🗑</Button>
          </div>          
        }
        
      </Card.Body>
    </Card>
  );
};

export default OneCard;

// #f53100 red
// #00AF54 green