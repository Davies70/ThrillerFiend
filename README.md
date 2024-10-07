# ThrillerFiend

[![Netlify Status](https://api.netlify.com/api/v1/badges/f55b5ffe-7a5b-4f72-bf12-3b75f8a5f7b7/deploy-status)](https://app.netlify.com/sites/thrillerfiend/deploys)

ThrillerFiend is a web application for thriller enthusiasts to discover, track, and engage with their favorite books. Built with React and powered by various APIs, it offers a rich, interactive experience for book lovers.

![ThrillerFiend Homepage](/public/thrillerfiend.PNG)

## Live Demo

Visit [ThrillerFiend](https://thrillerfiend.netlify.app) to see the app in action!

## Features

- **Book Discovery**: Explore a vast collection of thriller books using data from the Google Books API.
- **Latest Releases**: Stay up-to-date with the newest thriller titles, powered by the New York Times API.
- **Personal Collections**: Organize books into custom collections like favorites, read later, and already read.
- **Book Interactions**: Rate books, add personal notes, and manage your reading experiences.
- **Author Insights**: Access a curated collection of author information.
- **Blog Section**: Enjoy pop culture references and interesting facts in our "Did You Know" section.
- **Robust Search**: Find books quickly and efficiently with our advanced search feature.

## Technology Stack

- **Frontend**: React
- **Development Server**: Vite
- **UI Framework**: Material-UI
- **Backend & Authentication**: Firebase
- **Database**: Firestore
- **APIs**:
  - Google Books API
  - New York Times API
- **Hosting**: Netlify

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/thrillerfiend.git
   ```

2. Navigate to the project directory:

   ```
   cd thrillerfiend
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
   VITE_NYT_API_KEY=your_nyt_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

   Replace `your_*` with your actual API keys and Firebase configuration.

5. Start the development server:

   ```
   npm run dev
   ```

6. Open `http://localhost:3000` in your browser.

## Usage

![Search Feature](path/to/search-feature-screenshot.png)

1. **Search for Books**: Use the search bar to find thriller books.
2. **Explore Latest Releases**: Check out the "Hot Thrills" section for new releases.
3. **Manage Collections**: Add books to your personal collections and manage them in the "Collections" tab.
4. **Interact with Books**: Rate books, add notes, and track your reading progress.
5. **Discover Authors**: Explore the author collection for more insights.

## Contributing

We welcome contributions to ThrillerFiend! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Books API
- New York Times API
- Firebase team
- All the thriller authors who inspire us

## Contact

For any queries or suggestions, please reach out to [your-email@example.com](mailto:your-email@example.com).

---

Happy reading with ThrillerFiend! 📚🕵️‍♂️
