import '../../styles/Banner.css';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className='bg-container' onClick={goToSignUp}>
      <div className='banner'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='800'
          height='200'
          viewBox='0 0 900 200'
          className='svg-banner'
        >
          <defs>
            <linearGradient id='bg-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' style={{ stopColor: '#a8edf0' }} />
              <stop offset='100%' style={{ stopColor: '#0c6b6f' }} />
            </linearGradient>
          </defs>
          <rect
            width='100%'
            height='100%'
            fill='url(#bg-gradient)'
            rx='8'
            ry='8'
          />
          <text
            x='29%'
            y='25%'
            fontFamily='Roboto, sans-serif'
            fontSize='30'
            fill='black'
            textAnchor='middle'
            dominantBaseline='middle'
            fontWeight={700}
          >
            Welcome,
          </text>
          <text
            x='56%'
            y='25%'
            fontFamily='Nosifer, sans-serif'
            fontSize='30'
            fill='black'
            textAnchor='middle'
            dominantBaseline='middle'
            fontWeight={700}
          >
            Thrillseekers
          </text>
          <text
            x='49%'
            y='52%'
            fontFamily='Roboto, sans-serif'
            fontSize='30'
            fill='black'
            textAnchor='middle'
            dominantBaseline='middle'
            fontWeight={700}
          >
            Sign up to explore the dark depths of thrillers and mysteries
          </text>
          <text
            x='33.2%'
            y='81%'
            fontFamily='Roboto, sans-serif'
            fontSize='20'
            fill='black'
            textAnchor='middle'
            dominantBaseline='middle'
            fontWeight={700}
          >
            Let
          </text>
          <text
            x='43.5%'
            y='80%'
            fontFamily='Creepster, sans-serif'
            fontSize='25'
            fill='black'
            textAnchor='middle'
            dominantBaseline='middle'
            fontWeight={700}
          >
            Thriller Fiend
          </text>
          <text
            x='59%'
            y='81%'
            fontFamily='Roboto, sans-serif'
            fontSize='20'
            fill='black'
            textAnchor='middle'
            dominantBaseline='middle'
            fontWeight={700}
          >
            be your guide
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
