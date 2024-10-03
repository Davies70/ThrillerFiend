import Proptypes from 'prop-types';
import '../styles/GridItem.css';
import OutboundIcon from '@mui/icons-material/Outbound';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const GridItem = ({ book }) => {
  const { title, book_image, authors, book_id } = book;
  return (
    <div className='gridItem' title={title}>
      <div className='gridItem-content'>
        <Link className='grid-left' to={`/book/${book_id}`}>
          <img src={book_image} loading='lazy' alt={title} />
          <button tabIndex='-1' className='visitButton'>
            <OutboundIcon className='visit' />
          </button>
        </Link>
        <div className='grid-center'>
          <div className='grid-center-title'>
            <Link to={`/book/${book_id}`}>{title}</Link>
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
  book: Proptypes.object.isRequired,
};

export default GridItem;
