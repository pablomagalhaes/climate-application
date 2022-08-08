import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getObservation } from '../services/GetObservation';
import { filterCityData } from '../helpers/Filters';
import { postObservation } from '../services/Firebase';
import { showSuccessNotification, showFailureNotification, showWarningNotification } from '../helpers/Notifications';
import { startFetching, stopFetching, storeObservation } from '../store/Actions';
import GenericButton from '../components/GenericButton';
import Display from '../components/Display';
import { Link } from 'react-router-dom';

import '../assets/styles/Home.css';

import inicialFigure from '../assets/images/svgs/inicial.svg';
import rainFigure from '../assets/images/svgs/rain.svg';
import sunFigure from '../assets/images/svgs/sun.svg';
import snowFigure from '../assets/images/svgs/snow.svg';
import thunderFigure from '../assets/images/svgs/thunder.svg';
import cloudyFigure from '../assets/images/svgs/cloudy.svg';

import dayBg from '../assets/images/day_bg.png';
import nightBg from '../assets/images/night_bg.jpg';


const StyledHome = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Home = () => {
  const { isLoading, hasObservation, observation } = useSelector(state => state.temperatures);
  const dispatch = useDispatch();
  const [background, setBackground] = useState(dayBg);
  const [LandingImg, setLandingImg] = useState(inicialFigure)





  const handleClick = (city) => {
    dispatch(startFetching());
    getObservation(city)
      .then((response) => {
        const { data } = response;
        console.log('data', data);
        const sys = data.sys;
        const { icon } = data.weather[0];
        const { description } = data.weather[0];
        console.log('data.weather[0]', data.weather[0]);

        const newObservation = filterCityData(data.main, city,);

        if(data?.weather[0].icon.slice(2))
        console.log('data?.weather[0].icon.slice(2)', data?.weather[0].icon.slice(2))
        setBackground(nightBg);

        switch (data?.weather[0].main) {
          case 'Clear':
            setLandingImg(sunFigure);
            break
      
          case 'Clouds':
            setLandingImg(sunFigure);
            break
      
          case 'Haze':
            setLandingImg(cloudyFigure);
            break
      
          case 'Thunderstorm':
            setLandingImg(thunderFigure);
            break
            
          case 'Rain':
            setLandingImg(rainFigure);
            break
      
          case 'Drizzle':
            setLandingImg(rainFigure);
            break
      
          case 'Snow':
            setLandingImg(snowFigure);
            break
      
          default:
            setLandingImg(inicialFigure);
            break
        }
      

        
        postObservation(newObservation)
          .then(() => showSuccessNotification())
          .catch(() => showWarningNotification())
          .finally(() => {
            dispatch(
              storeObservation({
                ...newObservation,
                icon,
                description,
                sys
              })
            );
          });
      })
      .catch(() => {
        showFailureNotification();
        dispatch(stopFetching());
      });
  };

  return (
    <StyledHome>
        <div className="background">
          <img src={background} alt="Wallpaper" className="img-background"/>
        </div>
        <div className="main-grid">
          <div className='content'>
            
            <div className='principal'>
              <div className="header">
                <div className='buttons'>
                  <GenericButton 
                    city='Rio de Janeiro'
                    clickHandler={handleClick}
                    isLoading={isLoading}
                  />
                </div>
                <div className='buttons'>
                  <GenericButton 
                    city='São Paulo'
                    clickHandler={handleClick}
                    isLoading={isLoading}
                  />
                </div>
                <div className='buttons'>
                  <GenericButton 
                    city='Belo Horizonte'
                    clickHandler={handleClick}
                    isLoading={isLoading}
                  />
                </div>
              </div>  

                <Display
                  isLoading={isLoading}
                  hasObservation={hasObservation}
                  observation={observation}
                />
                
            </div>

            <div className="secondary">
              <div className="landing-figure">
                <img src={LandingImg} alt="Landing"/>
              </div>
              <div className="go-maps">
                <Link to="/report">
                  Reports Mín/Máx
                </Link>
              </div>
            </div>

          </div> 
          <div className="credits">
          <a href="https://github.com/pablomagalhaes" target="_blank" rel="noopener noreferrer">
            <strong>Thiago Magalhães</strong>
          </a>
        </div>
        </div>    

    </StyledHome>
  );
};

export default Home;
