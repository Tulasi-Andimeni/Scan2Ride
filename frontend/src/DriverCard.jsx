


// DriverCard.jsx
import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from './config';

const DriverCard = ({ driver, showDeleted, onDelete, onRestore, onEdit }) => {
  return (
    <StyledWrapper>
      <section className="product-container product-1">
        <div className="card">
          <div className="photo">
          <img
  src={
    driver.img
      ? driver.img.startsWith("http")
        ? driver.img
        : `${BASE_URL}${driver.img}`
      : "/placeholder.png" // optional placeholder
  }
  alt={driver.name || "Driver"}
/>
          </div>
          <div className="content">
            <div className="title">{driver.name}</div>
            <div className="bg-title">DRV</div>

            <div className="feature">
              <div>Experience:</div>
              <span>{driver.experienceYears || driver.experience}</span>
            </div>

            <div className="feature">
              <div>Phone:</div>
              <span>{driver.phoneNumber || driver.phone}</span>
            </div>

            <div className="feature">
              <div>Bus No:</div>
              <span>{driver.busNumber || driver.busNo}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {showDeleted ? (
                <button className="btn-buy0" onClick={onRestore}>🔄</button>
              ) : (
                <>
                  <button className="btn-buy1" onClick={onDelete}>🗑️</button>
                  <button className="btn-buy2" onClick={onEdit}>✏️</button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .product-container {
    position: relative;
  }
  .card {
    font-family: Lato, sans-serif;
    position: relative;
    width: 290px;
    height: 400px;
    background: #232323;
    border-radius: 20px;
    overflow: hidden;
     box-shadow: 0 8px 32px 0 rgba(255, 138, 0, 0.18), 0 1.5px 8px #ff810055;
     border: 2px solid rgba(255, 138, 0, 0.13);
     transition: transform 0.35s cubic-bezier(.4,2,.3,1),
    box-shadow 0.35s,
       border 0.25s;
       margin-top: -12%;
       
  }
  .card:before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: var(--product-color);
    clip-path: circle(150px at 80% 20%);
    transition: .5s ease-in-out;
    
  }
  .card:hover:before {
    clip-path: circle(300px at 80% -20%);
     opacity: 1;
     filter: brightness(1.08) blur(1px);
   }
  .card:hover{
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 10px 38px 0 #ff8100cc, 0 2px 6px #ffdc52aa;
      border: 2px solid #ff8100;}
  
  .title {
    position: relative;
    font-weight: 600;
    letter-spacing: 1px;
    color: #fff;
    margin-top: 12px;
    text-shadow: 0 1px 8px #ff8100aa;
    font-size: 1.5em;
  }
  .bg-title {
    font-size: 10em;
    font-weight: 900;
    font-style: italic;
    color: rgba(255,255,255,.04);
    position: absolute;
    max-width: 120%;
    top: -150%;
    transition: .6s;
  }
  .card:hover .bg-title {
    transform: translateY(60%);
     transform: translateY(-10px) scale(1.03);
  //  border: 2px solid #ff8100;
  }
  .photo {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 100%;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .photo img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 50%;
    transition: .5s;
     border: 4px solid #fff;
     box-shadow: 0 2px 16px #ff8100aa, 0 0 0 8px #fff2;
     transition: box-shadow 0.3s, border 0.3s, width 0.5s;
    // background: #fff;
  }
  .card:hover .photo {
    top: 0;
    transform: translateY(0%);
  }
  .card:hover .photo img {
    width: 160px;
     box-shadow: 0 4px 32px #ffdc52cc, 0 0 0 12px #ff810033;
     border: 4px solid #ffdc52;

  }
  .content {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    text-align: center;
    transition: 1s;
    z-index: 5;
  }
  .card:hover .content {
    height: 220px;
  }
  .feature {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
    visibility: hidden;
    opacity: 0;
    transition: .5s;
  }
  .card:hover .feature {
    visibility: visible;
    opacity: 1;
    transition-delay: .5s;
  }
  .feature div {
    color: #fff;
    font-weight: 300;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-right: 10px;
  }
  .feature span {
    min-width: 20px;
    padding: 0 4px;
    line-height: 26px;
    font-size: 14px;
    background: #fff;
    color: #111;
    margin: 0 5px;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-buy1, .btn-buy2, .btn-buy0 {
    background: #fff;
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
    background: linear-gradient(90deg, #ff8100 60%, #ffdc52 100%);
     color: #fff;
     font-weight: 700;
     box-shadow: 0 2px 8px #ff810055;
     transition: background 0.2s, box-shadow 0.2s, transform 0.2s;

  }
  .btn-buy1:hover {
    background: #ff4d4d;
  }
  .btn-buy2:hover {
    background: #ffaa00;
  }
  .btn-buy0:hover {
    background: #4CAF50;
  }
  .product-1 {
    --product-color: #FF8A00;
  }
`;

export default DriverCard;