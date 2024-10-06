import '../styles/FreeThrills.css';
import { Link } from 'react-router-dom';

const FreeThrills = () => {
  return (
    <div className='free-thrills'>
      <h1>Hot Thrills</h1>
      <p>
        Welcome to the edge-of-your-seat world of thriller novels! Dive into our
        world of spine-chilling facts, pop culture connections, and
        recommendations that will keep you up all night.
      </p>

      <div className='blog-post'>
        <h2>The Silence of the Lambs: More Than Just a Clever Title</h2>

        <img
          className='blog-img'
          src='https://ew.com/thmb/HNpfnYXr-tyyyHWl9jjg99dLrDs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/silence20of20the20lambs_0-c9cff20e8d054953873bf9bf609d9def.jpg'
        />

        <p>
          Thomas Harris&apos;s psychological thriller &quot;
          <a className='blog-link' target='_blank' href='book/1d3XWXXxnEsC'>
            {' '}
            The Silence of the Lambs
          </a>
          &quot; has become a cultural phenomenon, but did you know the title
          has a deeper meaning?
        </p>
        <div className='fact-box'>
          <strong>Did You Know?</strong> The title &quot;The Silence of the
          Lambs&quot; refers to protagonist Clarice Starling&apos;s traumatic
          childhood memory of hearing lambs screaming as they were being
          slaughtered and her inability to save them.
        </div>
        <p>
          This childhood trauma drives Clarice&apos;s determination to save
          Catherine Martin from the serial killer Buffalo Bill, creating a
          powerful metaphor throughout the novel.
        </p>
        <p className='pop-culture'>
          Pop Culture: The 1991 film adaptation swept the &quot;Big Five&quot;
          Academy Awards, becoming only the third film in history to do so.
          Anthony Hopkins&apos; portrayal of Dr. Hannibal Lecter became iconic,
          despite having only 16 minutes of screen time.
        </p>
        <Link to='/similarbooks/hannibal lecter' className='cta-button'>
          Explore More Hannibal Lecter Novels
        </Link>
      </div>

      <div className='blog-post'>
        <h2>Gone Girl: The Twist That Shocked the World</h2>
        <img
          src='https://oneofus.net/wp-content/uploads/2014/09/gone-girl-affleck-pike-fincher-photo.jpg'
          alt='Gone Girl book cover and film still'
          className='blog-img'
        />
        <p>
          Gillian Flynn&apos;s &quot;
          <a className='blog-link' href='/book/L25K1tY5WyoC' target='_blank'>
            Gone Girl
          </a>
          &quot; took the literary world by storm with its unreliable narrators
          and shocking plot twists. But the impact of this thriller goes beyond
          just its narrative.
        </p>
        <div className='fact-box'>
          <strong>Did You Know?</strong> &quot;Gone Girl&quot; popularized the
          term &quot;cool girl&quot; monologue, which became a widely discussed
          topic in feminism and pop culture.
        </div>
        <p>
          The novel&apos;s exploration of toxic relationships and media
          manipulation resonated with readers worldwide, sparking conversations
          about gender roles and societal expectations.
        </p>
        <p className='pop-culture'>
          Pop Culture: The film adaptation, directed by David Fincher, was
          praised for its faithful representation of the book. It also sparked a
          trend of &quot;domestic noir&quot; thrillers in both literature and
          film.
        </p>
        <Link className='cta-button' to='/similarbooks/pyschological thrillers'>
          Discover Similar Psychological Thrillers
        </Link>
      </div>

      <div className='blog-post'>
        <h2>The Da Vinci Code: Controversy in 234 Pages</h2>
        <img
          src='https://www.denofgeek.com/wp-content/uploads/2021/02/Tom-Hanks-and-Audrey-Tautou-in-The-Da-Vinci-Code.jpg?resize=768%2C432'
          alt='The Da Vinci Code book cover and movie poster'
          className='blog-img'
        />
        <p>
          Dan Brown&apos;s &quot;
          <a className='blog-link' target='_blank' href='book/t2o9ojS7T10C'>
            The Da Vinci Code
          </a>
          &quot; became a global phenomenon, blending art history, conspiracy
          theories, and breakneck pacing into an irresistible thriller.
        </p>
        <div className='fact-box'>
          <strong>Did You Know?</strong> The Da Vinci Code was so controversial
          that it was banned in Lebanon for its perceived offensive content
          towards Christianity.
        </div>
        <p>
          Despite (or perhaps because of) the controversy, the book sold over 80
          million copies worldwide, making it one of the best-selling novels of
          all time.
        </p>
        <p className='pop-culture'>
          Pop Culture: The book&apos;s success led to a surge in tourism to the
          Louvre in Paris and other locations mentioned in the novel. It also
          inspired a whole genre of conspiracy thriller novels.
        </p>
        <Link to='/similarbooks/historical thriller' className='cta-button'>
          Uncover More Historical Thrillers
        </Link>
      </div>

      <div className='blog-post'>
        <h2>The Girl with the Dragon Tattoo: A Swedish Sensation</h2>
        <img
          src='https://ew.com/thmb/s76INz0L6p6e9aje0FjnWciCSmI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/000081544hr-2000-23c28480e0b84ddeb10006e8ffc8210f.jpg'
          alt='The Girl with the Dragon Tattoo book cover and film still'
          className='blog-img'
        />
        <p>
          Stieg Larsson&apos;s Millennium series, starting with &quot;
          <a className='blog-link' href='book/qYcJVplnx5cC' target='_blank'>
            The Girl with the Dragon Tattoo
          </a>
          ,&quot; brought Nordic noir to the global stage and introduced us to
          the unforgettable Lisbeth Salander.
        </p>
        <div className='fact-box'>
          <strong>Did You Know?</strong> Stieg Larsson never saw the success of
          his books. He died in 2004, before the first book in the trilogy was
          published.
        </div>
        <p>
          The series&apos; exploration of institutional corruption, violence
          against women, and the power of investigative journalism struck a
          chord with readers worldwide.
        </p>
        <p className='pop-culture'>
          Pop Culture: The books have been adapted into Swedish films, with
          Noomi Rapace as Lisbeth Salander, and later into an English-language
          film starring Rooney Mara. The character of Lisbeth Salander has
          become an icon of resilience and nonconformity.
        </p>
        <Link to='/similarbooks/nordic noir thriller' className='cta-button'>
          Explore More Nordic Noir Thrillers
        </Link>
      </div>
    </div>
  );
};

export default FreeThrills;
