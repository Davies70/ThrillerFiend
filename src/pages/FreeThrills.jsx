import "../styles/pages/FreeThrills.css";
import { Link } from "react-router-dom";
import { Fade } from "@mui/material";

const blogPosts = [
  {
    id: 1,
    title: "The Silence of the Lambs: More Than Just a Clever Title",
    imgSrc:
      "https://ew.com/thmb/HNpfnYXr-tyyyHWl9jjg99dLrDs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/silence20of20the20lambs_0-c9cff20e8d054953873bf9bf609d9def.jpg",
    // Explicit spacing in the strings fixes the gap issue
    introStart: "Thomas Harris's psychological thriller \"",
    bookTitle: "The Silence of the Lambs",
    bookLink: "/book/1d3XWXXxnEsC", // Leading slash ensures absolute routing
    introEnd:
      '" has become a cultural phenomenon, but did you know the title has a deeper meaning?',
    fact: "The title refers to protagonist Clarice Starling's traumatic childhood memory of hearing lambs screaming as they were being slaughtered and her inability to save them.",
    body: "This childhood trauma drives Clarice's determination to save Catherine Martin from the serial killer Buffalo Bill, creating a powerful metaphor throughout the novel.",
    popCulture:
      "The 1991 film adaptation swept the 'Big Five' Academy Awards, becoming only the third film in history to do so. Anthony Hopkins' portrayal of Dr. Hannibal Lecter became iconic, despite having only 16 minutes of screen time.",
    ctaText: "Explore More Hannibal Lecter Novels",
    ctaLink: "/similarbooks/hannibal lecter",
    readTime: "2 min read",
  },
  {
    id: 2,
    title: "Gone Girl: The Twist That Shocked the World",
    imgSrc:
      "https://oneofus.net/wp-content/uploads/2014/09/gone-girl-affleck-pike-fincher-photo.jpg",
    introStart: "Gillian Flynn's \"",
    bookTitle: "Gone Girl",
    bookLink: "/book/L25K1tY5WyoC",
    introEnd:
      '" took the literary world by storm with its unreliable narrators and shocking plot twists. But the impact of this thriller goes beyond just its narrative.',
    fact: "It popularized the term 'cool girl' monologue, which became a widely discussed topic in feminism and pop culture.",
    body: "The novel's exploration of toxic relationships and media manipulation resonated with readers worldwide, sparking conversations about gender roles and societal expectations.",
    popCulture:
      "The film adaptation, directed by David Fincher, was praised for its faithful representation of the book. It also sparked a trend of 'domestic noir' thrillers in both literature and film.",
    ctaText: "Discover Similar Psychological Thrillers",
    ctaLink: "/similarbooks/pyschological thrillers",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "The Da Vinci Code: Controversy in 234 Pages",
    imgSrc:
      "https://www.denofgeek.com/wp-content/uploads/2021/02/Tom-Hanks-and-Audrey-Tautou-in-The-Da-Vinci-Code.jpg?resize=768%2C432",
    introStart: "Dan Brown's \"",
    bookTitle: "The Da Vinci Code",
    bookLink: "/book/t2o9ojS7T10C",
    introEnd:
      '" became a global phenomenon, blending art history, conspiracy theories, and breakneck pacing into an irresistible thriller.',
    fact: "The Da Vinci Code was so controversial that it was banned in Lebanon for its perceived offensive content towards Christianity.",
    body: "Despite (or perhaps because of) the controversy, the book sold over 80 million copies worldwide, making it one of the best-selling novels of all time.",
    popCulture:
      "The book's success led to a surge in tourism to the Louvre in Paris and other locations mentioned in the novel. It also inspired a whole genre of conspiracy thriller novels.",
    ctaText: "Uncover More Historical Thrillers",
    ctaLink: "/similarbooks/historical thriller",
    readTime: "2 min read",
  },
  {
    id: 4,
    title: "The Girl with the Dragon Tattoo: A Swedish Sensation",
    imgSrc:
      "https://ew.com/thmb/s76INz0L6p6e9aje0FjnWciCSmI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/000081544hr-2000-23c28480e0b84ddeb10006e8ffc8210f.jpg",
    introStart: "Stieg Larsson's Millennium series, starting with \"",
    bookTitle: "The Girl with the Dragon Tattoo",
    bookLink: "/book/qYcJVplnx5cC",
    introEnd:
      '," brought Nordic noir to the global stage and introduced us to the unforgettable Lisbeth Salander.',
    fact: "Stieg Larsson never saw the success of his books. He died in 2004, before the first book in the trilogy was published.",
    body: "The series' exploration of institutional corruption, violence against women, and the power of investigative journalism struck a chord with readers worldwide.",
    popCulture:
      "The books have been adapted into Swedish films, with Noomi Rapace as Lisbeth Salander, and later into an English-language film starring Rooney Mara. Lisbeth Salander has become an icon of resilience.",
    ctaText: "Explore More Nordic Noir Thrillers",
    ctaLink: "/similarbooks/nordic noir thriller",
    readTime: "3 min read",
  },
];

const FreeThrills = () => {
  return (
    <Fade in={true} timeout={800}>
      <div className="free-thrills-container">
        <header className="free-thrills-header">
          <h1>Hot Thrills & Trivia</h1>
          <p>
            Dive into our world of spine-chilling facts, pop culture
            connections, and deep-dives into the thrillers that kept the world
            awake.
          </p>
        </header>

        <div className="blog-list">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-post">
              <div className="blog-meta">
                <span className="read-time">{post.readTime}</span>
              </div>

              <h2>{post.title}</h2>

              <div className="blog-img-wrapper">
                <img
                  src={post.imgSrc}
                  alt={post.bookTitle}
                  className="blog-img"
                  loading="lazy"
                />
              </div>

              <div className="blog-content">
                {/* THE FIX IS HERE */}
                <p>
                  {post.introStart}
                  <Link
                    className="blog-link"
                    to={post.bookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.bookTitle}
                  </Link>
                  {post.introEnd}
                </p>

                <div className="fact-box">
                  <span className="fact-icon">💡</span>
                  <div>
                    <strong>Did You Know?</strong> {post.fact}
                  </div>
                </div>

                <p>{post.body}</p>

                <div className="pop-culture">
                  <strong>🎬 Pop Culture:</strong> {post.popCulture}
                </div>

                <Link to={post.ctaLink} className="cta-button">
                  {post.ctaText}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Fade>
  );
};

export default FreeThrills;
