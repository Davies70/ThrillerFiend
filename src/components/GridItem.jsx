import React from 'react';
import Proptypes from 'prop-types';
import '../styles/GridItem.css';
import OutboundIcon from '@mui/icons-material/Outbound';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';

const GridItem = ({ name, photo, authors }) => {
  return (
    <div className='gridItem'>
      <div className='gridItem-content'>
        <div className='grid-left'>
          <img src={photo} loading='lazy' alt={name} />
          <button tabIndex='-1' className='visitButton'>
            <OutboundIcon className='visit' />
          </button>
          {/* <a className='bg rectangle'>
            
            <button className='' tabIndex='-1'>
              <ArrowCircleRightOutlinedIcon />
            </button>
           
          </a> */}
        </div>
        <div className='grid-center'>
          <div className='grid-center-title'>
            <a>{name}</a>
          </div>
          <span className='grid-center-author'>
            <a>{authors.join(', ')}</a>
          </span>
        </div>
        <div className='grid-icons'>
          <button aria-label='Add to Collections' title='Add to Collections'>
            <AddIcon />
          </button>
          <button>
            <MoreHorizOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

GridItem.propTypes = {
  name: Proptypes.string,
  photo: Proptypes.string,
  authors: Proptypes.array,
};

export default GridItem;
