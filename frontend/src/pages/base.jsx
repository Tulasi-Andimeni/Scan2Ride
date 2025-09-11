import './base.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

// main page

function Base () {
    const navigate = useNavigate();
    return (
        <div className="base-background">
            <div className="base-overlay">
                <span className='base-title'>Scan 2 Ride</span>
                <p className='base-tagline'>Empowering institutions with smart transport monitoring — because safety begins with awareness.</p>
                <button className='base-button-31' onClick={() => navigate('/signin')} role='button'  >Log in</button>
                <div className='base-line'>New User ? <a href='#'  onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Sign up</a></div>
            </div>
            <div className='animated-shapes'>
                <div className='blob blob1'></div>
                <div className='blob blob2'></div>
                <div className='blob blob3'></div>
            </div>
            <div className='base-animation'>
                <DotLottieReact 
                    src="https://lottie.host/2b2af2ae-625f-4b34-afbf-559406906789/D3lMyoAgdD.lottie"  
                    loop 
                    muted 
                    autoplay 
                    className='base-img' 
                />
            </div>

        </div>
    );
}

export default Base;
