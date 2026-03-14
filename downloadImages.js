import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PASTE YOUR ARRAY HERE
const authors = [
  {
    id: "4FjFVFsgbnY6h046jymu",
    birthYear: 1947,
    followers: ["t1NxF0vdh0PkGn5iIve6Y4R9Sfj2"],
    coverPhoto:
      "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1331425.jpg",
    genres: ["Techno-thriller", "Military Fiction", "Espionage"],
    awards: ["National Defense Industrial Association Special Award"],
    nationality: "American",
    similarAuthors: [
      {
        name: "Robert Ludlum",
        authorId: "lWJQd2NWxF6SEeTs9rT9",
        coverPhoto:
          "https://images.gr-assets.com/authors/1597472804p8/5293.jpg",
      },
      {
        name: "Dan Brown",
        authorId: "JOipGAf0t7SKGtyrpUCZ",
        coverPhoto:
          "https://ew.com/thmb/A2EMGBA98MF_E_NTb6-8NKfz56w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dan-brown-2000-83001493b69e442cae02620306e58eac.jpg",
      },
      {
        name: "Thomas Harris",
        authorId: "vq4Bzq2kksbOs3t9HfW2",
        coverPhoto:
          "https://images.gr-assets.com/authors/1602363825p8/12455.jpg",
      },
    ],
    deathYear: 2013,
    authorName: "Tom Clancy",
    description:
      "Tom Clancy was an American novelist best known for his technically detailed espionage and military-science storylines set during and after the Cold War. His debut novel, 'The Hunt for Red October', was published by the Naval Institute Press, marking their first fictional work. Clancy's meticulous attention to detail and extensive research into military technology and operations garnered him a dedicated readership. His works have not only been bestsellers but also adapted into successful films and video games, expanding his influence beyond the literary world.",
    notableWorks: [
      "The Hunt for Red October",
      "Patriot Games",
      "Clear and Present Danger",
    ],
  },
  {
    id: "5G6DiG8wTHAlan4fB9CS",
    birthYear: 1953,
    genres: ["Medical Thriller", "Crime Fiction", "Mystery"],
    coverPhoto:
      "https://m.media-amazon.com/images/S/amzn-author-media-prod/ohl9fvia99utn4h4jnhp1d8fgf.jpg",
    followers: ["t1NxF0vdh0PkGn5iIve6Y4R9Sfj2"],
    awards: ["RITA Award", "Nero Award"],
    nationality: "American",
    authorName: "Tess Gerritsen",
    description:
      "Tess Gerritsen, a former physician, brings her medical expertise to her thrilling novels. Her Rizzoli & Isles series, featuring a tough detective and a brilliant medical examiner, combines medical science with gripping crime plots. Gerritsen's ability to weave intricate narratives with detailed medical knowledge has earned her a dedicated readership.",
    notableWorks: ["The Surgeon", "Body Double", "The Keepsake"],
    similarAuthors: [
      {
        name: "Patricia Highsmith",
        authorId: "sxEteLIzNze1Sh5Z0XYU",
        coverPhoto:
          "https://images.gr-assets.com/authors/1418715271p5/7622.jpg",
      },
      {
        name: "Lisa Gardner",
        authorId: "9NzR5Sj2a1dMMcMxJTXv",
        coverPhoto:
          "https://images.gr-assets.com/authors/1395879573p8/18282.jpg",
      },
      {
        name: "Tana French",
        authorId: "7NZwDJjkIGMsLvX1X64K",
        coverPhoto:
          "https://images.gr-assets.com/authors/1535655031p8/138825.jpg",
      },
    ],
  },
  {
    id: "6FVsG66zmMJUucWtkXIB",
    nationality: "Swedish",
    awards: ["Glass Key Award", "Galaxy British Book Awards"],
    description:
      'Stieg Larsson, a Swedish journalist and writer, gained posthumous fame with his Millennium series, starting with "The Girl with the Dragon Tattoo". His novels combine gripping plots with deep social commentary, tackling issues like corruption, abuse, and the misuse of power. Larsson\'s creation, Lisbeth Salander, has become a cultural icon and a symbol of resilience and justice.',
    notableWorks: [
      "The Girl with the Dragon Tattoo",
      "The Girl Who Played with Fire",
      "The Girl Who Kicked the Hornet's Nest",
    ],
    authorName: "Stieg Larsson",
    deathYear: 2004,
    similarAuthors: [
      {
        name: "Tom Clancy",
        authorId: "4FjFVFsgbnY6h046jymu",
        coverPhoto:
          "https://images.gr-assets.com/authors/1642083377p8/3892.jpg",
      },
      {
        name: "Gillian Flynn",
        authorId: "UGHOlhQpE6cDgX2G5ORI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
      },
      {
        name: "Lee Child",
        authorId: "di1wyyMioqFeLnxqa2wa",
        coverPhoto:
          "https://images.gr-assets.com/authors/1377708686p8/5091.jpg",
      },
    ],
    birthYear: 1954,
    genres: ["Crime Fiction", "Thriller", "Mystery"],
    followers: ["t1NxF0vdh0PkGn5iIve6Y4R9Sfj2"],
    coverPhoto: "https://images.gr-assets.com/authors/1595150953p8/706255.jpg",
  },
  {
    id: "7NZwDJjkIGMsLvX1X64K",
    nationality: "Irish-American",
    awards: ["Edgar Award for Best First Novel"],
    notableWorks: ["In the Woods", "The Likeness", "Faithful Place"],
    description:
      'Tana French, an Irish-American author, is celebrated for her atmospheric and intricately plotted Dublin Murder Squad series. Her debut novel, "In the Woods", won several awards and established her as a formidable voice in crime fiction. French\'s deep character studies and evocative settings draw readers into her stories, where the line between the past and present often blurs.',
    authorName: "Tana French",
    similarAuthors: [
      {
        name: "David Baldacci",
        authorId: "TmpMz5rDqKiQ13qhRach",
        coverPhoto:
          "https://images.gr-assets.com/authors/1712679518p8/9291.jpg",
      },
      {
        name: "Gillian Flynn",
        authorId: "UGHOlhQpE6cDgX2G5ORI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
      },
      {
        name: "John Grisham",
        authorId: "l80qJuAd9l33gdUPRpTM",
        coverPhoto: "https://images.gr-assets.com/authors/1650547491p5/721.jpg",
      },
    ],
    birthYear: 1973,
    genres: ["Crime Fiction", "Mystery", "Psychological Thriller"],
    coverPhoto: "https://images.gr-assets.com/authors/1535655031p8/138825.jpg",
    followers: [],
  },
  {
    id: "7TnUxyewxyEXcoMtF9ig",
    similarAuthors: [
      {
        name: "Tess Gerritsen",
        authorId: "5G6DiG8wTHAlan4fB9CS",
        coverPhoto:
          "https://images.gr-assets.com/authors/1416348007p8/18149.jpg",
      },
      {
        name: "Tana French",
        authorId: "7NZwDJjkIGMsLvX1X64K",
        coverPhoto:
          "https://images.gr-assets.com/authors/1535655031p8/138825.jpg",
      },
      {
        name: "Ruth Ware",
        authorId: "fEZQeMiwsA6UrlaIiHYI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1562697198p8/9013543.jpg",
      },
    ],
    notableWorks: ["The Shining", "Misery", "It"],
    description:
      'Stephen King, the master of horror and suspense, has penned over 60 novels and 200 short stories. Known for his vivid storytelling and complex characters, King has created iconic works like "The Shining" and "It". His novels often intertwine the supernatural with everyday life, making the ordinary seem terrifying. King\'s influence on the genre is unparalleled, and his works have been adapted into numerous films and television series.',
    authorName: "Stephen King",
    nationality: "American",
    awards: ["Bram Stoker Award", "World Fantasy Award"],
    coverPhoto: "https://images.gr-assets.com/authors/1362814142p8/3389.jpg",
    genres: ["Horror", "Suspense", "Fantasy", "Crime Fiction"],
    birthYear: 1947,
  },
  {
    id: "9NzR5Sj2a1dMMcMxJTXv",
    genres: ["Thriller", "Mystery", "Crime Fiction"],
    coverPhoto: "https://images.gr-assets.com/authors/1395879573p8/18282.jpg",
    birthYear: 1956,
    authorName: "Lisa Gardner",
    notableWorks: ["Alone", "The Neighbor", "Before She Disappeared"],
    description:
      "Lisa Gardner, known for her fast-paced and intricately plotted thrillers, has a talent for creating strong, memorable characters. Her D.D. Warren series features a Boston-based detective navigating complex and often gruesome cases. Gardner's background in research shines through in her detailed and realistic portrayals of investigative procedures.",
    similarAuthors: [
      {
        name: "Gillian Flynn",
        authorId: "UGHOlhQpE6cDgX2G5ORI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
      },
      {
        name: "David Baldacci",
        authorId: "TmpMz5rDqKiQ13qhRach",
        coverPhoto:
          "https://images.gr-assets.com/authors/1712679518p8/9291.jpg",
      },
      {
        name: "Agatha Christie",
        authorId: "ZxXo2nykdhn0yxXylHIT",
        coverPhoto:
          "https://images.gr-assets.com/photos/1379448055p8/848499.jpg",
      },
    ],
    nationality: "American",
    awards: ["International Thriller Writers Award"],
  },
  {
    id: "9Qh4JG0uum2Eq7rCjVtr",
    notableWorks: ["Blindsighted", "Pretty Girls", "The Silent Wife"],
    description:
      "Karin Slaughter is a master of the modern crime thriller, known for her intense and emotionally driven narratives. Her Grant County and Will Trent series explore the dark and often brutal aspects of crime and justice. Slaughter's novels are celebrated for their strong character development, gripping plots, and unflinching portrayal of violence and trauma.",
    authorName: "Karin Slaughter",
    similarAuthors: [
      {
        name: "Dan Brown",
        authorId: "JOipGAf0t7SKGtyrpUCZ",
        coverPhoto:
          "https://ew.com/thmb/A2EMGBA98MF_E_NTb6-8NKfz56w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dan-brown-2000-83001493b69e442cae02620306e58eac.jpg",
      },
      {
        name: "Dennis Lehane",
        authorId: "TuHW1GhCEphCvgtNlWUT",
        coverPhoto:
          "https://images.gr-assets.com/authors/1227580381p8/10289.jpg",
      },
      {
        name: "Lee Child",
        authorId: "di1wyyMioqFeLnxqa2wa",
        coverPhoto:
          "https://images.gr-assets.com/authors/1377708686p8/5091.jpg",
      },
    ],
    awards: ["CWA Ian Fleming Steel Dagger"],
    nationality: "American",
    genres: ["Crime Fiction", "Mystery", "Thriller"],
    coverPhoto: "https://images.gr-assets.com/authors/1565730670p8/12504.jpg",
    birthYear: 1971,
  },
  {
    id: "GNxqiMsI35DOZMKzN5Jv",
    genres: ["Thriller", "Crime Fiction", "Mystery"],
    coverPhoto:
      "https://cdn.britannica.com/99/220799-050-8E06F837/American-author-James-Patterson.jpg",
    birthYear: 1947,
    notableWorks: ["Along Came a Spider", "Kiss the Girls", "1st to Die"],
    description:
      "James Patterson is an American author and philanthropist, renowned for his numerous thriller series including the Alex Cross series. Patterson holds the Guinness World Record for the most #1 New York Times bestsellers. His storytelling prowess extends beyond novels into young adult fiction, graphic novels, and nonfiction. Patterson has also been a prominent advocate for literacy, donating millions to independent bookstores and libraries.",
    authorName: "James Patterson",
    similarAuthors: [
      {
        name: "Ruth Ware",
        authorId: "fEZQeMiwsA6UrlaIiHYI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1562697198p8/9013543.jpg",
      },
      {
        name: "Tana French",
        authorId: "7NZwDJjkIGMsLvX1X64K",
        coverPhoto:
          "https://images.gr-assets.com/authors/1535655031p8/138825.jpg",
      },
      {
        name: "Robert Ludlum",
        authorId: "lWJQd2NWxF6SEeTs9rT9",
        coverPhoto:
          "https://images.gr-assets.com/authors/1597472804p8/5293.jpg",
      },
    ],
    awards: ["Edgar Award for Best First Novel"],
    nationality: "American",
  },
  {
    id: "JOipGAf0t7SKGtyrpUCZ",
    genres: ["Thriller", "Conspiracy Fiction", "Adventure"],
    coverPhoto:
      "https://ew.com/thmb/A2EMGBA98MF_E_NTb6-8NKfz56w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dan-brown-2000-83001493b69e442cae02620306e58eac.jpg",
    birthYear: 1964,
    authorName: "Dan Brown",
    notableWorks: ["The Da Vinci Code", "Angels & Demons", "Inferno"],
    description:
      'Dan Brown is celebrated for his gripping thrillers that blend history, art, and cryptology. His breakout novel, "The Da Vinci Code", revolutionized the genre and spurred global interest in religious symbology and conspiracy theories. Brown\'s meticulous research and fast-paced narratives keep readers on the edge of their seats, eager to unravel the mysteries within.',
    similarAuthors: [
      {
        name: "Tom Clancy",
        authorId: "4FjFVFsgbnY6h046jymu",
        coverPhoto:
          "https://images.gr-assets.com/authors/1642083377p8/3892.jpg",
      },
      {
        name: "Gillian Flynn",
        authorId: "UGHOlhQpE6cDgX2G5ORI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
      },
      {
        name: "Agatha Christie",
        authorId: "ZxXo2nykdhn0yxXylHIT",
        coverPhoto:
          "https://images.gr-assets.com/photos/1379448055p8/848499.jpg",
      },
    ],
    awards: ["Goodreads Choice Awards Best Mystery & Thriller"],
    nationality: "American",
  },
  {
    id: "KyrLjHRaVkBsagbHZVja",
    nationality: "British",
    awards: ["National Book Award"],
    deathYear: 1989,
    similarAuthors: [
      {
        name: "Mary Higgins Clark",
        authorId: "sAyCui2C5jiGrkBcqUcy",
        coverPhoto:
          "https://images.gr-assets.com/authors/1415136162p8/99044.jpg",
      },
      {
        name: "Tess Gerritsen",
        authorId: "5G6DiG8wTHAlan4fB9CS",
        coverPhoto:
          "https://images.gr-assets.com/authors/1416348007p8/18149.jpg",
      },
      {
        name: "Karin Slaughter",
        authorId: "9Qh4JG0uum2Eq7rCjVtr",
        coverPhoto:
          "https://images.gr-assets.com/authors/1565730670p8/12504.jpg",
      },
    ],
    notableWorks: ["Rebecca", "Jamaica Inn", "The Birds"],
    description:
      "Daphne du Maurier, an English author and playwright, is best known for her suspenseful, gothic novels that often explore themes of identity, jealousy, and the supernatural. Her most famous work, 'Rebecca', has never gone out of print and has been adapted into several films. Du Maurier was the daughter of actor-manager Sir Gerald du Maurier, which influenced her creative upbringing. She was also an amateur historian, which can be seen in her meticulously detailed settings.",
    authorName: "Daphne du Maurier",
    birthYear: 1907,
    coverPhoto:
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Young_Daphne_du_Maurier_restored_bw.jpg",
    genres: ["Gothic Fiction", "Suspense", "Romance"],
  },
  {
    id: "LVdgInSYEHCFB80CGIPJ",
    birthYear: 1948,
    genres: ["Crime Fiction", "Forensic Thriller", "Mystery"],
    coverPhoto: "https://images.gr-assets.com/authors/1407166867p8/26372.jpg",
    awards: ["Arthur Ellis Award", "Crime Writers' Association Award"],
    nationality: "American",
    authorName: "Kathy Reichs",
    notableWorks: ["Déjà Dead", "Death du Jour", "Bones Never Lie"],
    description:
      'Kathy Reichs, a forensic anthropologist, uses her real-life expertise to create authentic and compelling crime novels. Her Temperance Brennan series, the inspiration for the TV show "Bones", combines forensic science with gripping mysteries. Reichs\'s ability to translate complex scientific concepts into accessible and thrilling narratives has made her a standout in the genre.',
    similarAuthors: [
      {
        name: "John Grisham",
        authorId: "l80qJuAd9l33gdUPRpTM",
        coverPhoto: "https://images.gr-assets.com/authors/1650547491p5/721.jpg",
      },
      {
        name: "Jo Nesbo",
        authorId: "rNhY1DcFjoRpBYG2EIzz",
        coverPhoto:
          "https://images.gr-assets.com/authors/1493220079p8/904719.jpg",
      },
      {
        name: "Gillian Flynn",
        authorId: "UGHOlhQpE6cDgX2G5ORI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
      },
    ],
  },
  {
    id: "R8lKSYEm1i1G9RSBXyaf",
    genres: ["Suspense", "Horror", "Science Fiction"],
    coverPhoto: "https://images.gr-assets.com/authors/1581963714p8/9355.jpg",
    birthYear: 1945,
    authorName: "Dean Koontz",
    notableWorks: ["Watchers", "Intensity", "Odd Thomas"],
    description:
      "Dean Koontz is an American author known for his suspense thrillers that often blend elements of horror, fantasy, and science fiction. With over 100 novels to his name, Koontz's work is characterized by fast-paced plots and rich character development. His personal life, including his devotion to his late dog Trixie, often influences his writing. Koontz's books have sold over 450 million copies, making him one of the world's best-selling authors.",
    similarAuthors: [
      {
        name: "Lisa Gardner",
        authorId: "9NzR5Sj2a1dMMcMxJTXv",
        coverPhoto:
          "https://images.gr-assets.com/authors/1395879573p8/18282.jpg",
      },
      {
        name: "Paula Hawkins",
        authorId: "TH6H1h2zdPuRp7iXIsVF",
        coverPhoto:
          "https://images.gr-assets.com/authors/1492111911p8/1063732.jpg",
      },
      {
        name: "Robert Galbraith",
        authorId: "h1yhji1PZg5RYv4l1Xn5",
        coverPhoto:
          "https://images.gr-assets.com/authors/1596216614p8/1077326.jpg",
      },
    ],
    nationality: "American",
    awards: ["World Horror Convention Grand Master Award"],
  },
  {
    id: "TH6H1h2zdPuRp7iXIsVF",
    coverPhoto:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Paula_Hawkins_G%C3%B6teborg_Book_Fair_2015.jpg/800px-Paula_Hawkins_G%C3%B6teborg_Book_Fair_2015.jpg",
    genres: ["Psychological Thriller", "Mystery", "Crime Fiction"],
    birthYear: 1972,
    similarAuthors: [
      {
        name: "Gillian Flynn",
        authorId: "UGHOlhQpE6cDgX2G5ORI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
      },
      {
        name: "Lisa Gardner",
        authorId: "9NzR5Sj2a1dMMcMxJTXv",
        coverPhoto:
          "https://images.gr-assets.com/authors/1395879573p8/18282.jpg",
      },
      {
        name: "Patricia Highsmith",
        authorId: "sxEteLIzNze1Sh5Z0XYU",
        coverPhoto:
          "https://images.gr-assets.com/authors/1418715271p5/7622.jpg",
      },
    ],
    authorName: "Paula Hawkins",
    notableWorks: [
      "The Girl on the Train",
      "Into the Water",
      "A Slow Fire Burning",
    ],
    description:
      'Paula Hawkins burst onto the literary scene with her psychological thriller "The Girl on the Train", which became an international sensation. Hawkins\'s ability to create unreliable narrators and build suspense through multiple perspectives has captivated readers worldwide. Her subsequent novels continue to explore themes of trauma, memory, and the complexity of human relationships.',
    nationality: "British",
    awards: ["Goodreads Choice Awards Best Mystery & Thriller"],
  },
  {
    id: "TmpMz5rDqKiQ13qhRach",
    birthYear: 1960,
    genres: ["Thriller", "Mystery", "Political Fiction"],
    coverPhoto: "https://images.gr-assets.com/authors/1712679518p8/9291.jpg",
    nationality: "American",
    awards: ["Audie Award for Thriller/Suspense"],
    authorName: "David Baldacci",
    notableWorks: ["Absolute Power", "The Camel Club", "Memory Man"],
    description:
      'David Baldacci is a prolific writer whose novels blend suspense, political intrigue, and high-stakes drama. His debut novel, "Absolute Power", was a blockbuster success and set the stage for a career filled with bestsellers. Baldacci\'s intricate plotting and keen understanding of political and legal machinations make his books thrilling and thought-provoking.',
    similarAuthors: [
      {
        name: "James Patterson",
        authorId: "GNxqiMsI35DOZMKzN5Jv",
        coverPhoto:
          "https://cdn.britannica.com/99/220799-050-8E06F837/American-author-James-Patterson.jpg",
      },
      {
        name: "Jeffery Deaver",
        authorId: "faelnkQT2HjK5QNvCEF2",
        coverPhoto:
          "https://images.gr-assets.com/authors/1305944481p8/1612.jpg",
      },
      {
        name: "Tana French",
        authorId: "7NZwDJjkIGMsLvX1X64K",
        coverPhoto:
          "https://images.gr-assets.com/authors/1535655031p8/138825.jpg",
      },
    ],
  },
  {
    id: "TuHW1GhCEphCvgtNlWUT",
    coverPhoto: "https://images.gr-assets.com/authors/1227580381p8/10289.jpg",
    genres: ["Crime Fiction", "Mystery", "Psychological Thriller"],
    birthYear: 1965,
    similarAuthors: [
      {
        name: "Agatha Christie",
        authorId: "ZxXo2nykdhn0yxXylHIT",
        coverPhoto:
          "https://images.gr-assets.com/photos/1379448055p8/848499.jpg",
      },
      {
        name: "Mary Higgins Clark",
        authorId: "sAyCui2C5jiGrkBcqUcy",
        coverPhoto:
          "https://images.gr-assets.com/authors/1415136162p8/99044.jpg",
      },
      {
        name: "Stephen King",
        authorId: "7TnUxyewxyEXcoMtF9ig",
        coverPhoto:
          "https://images.gr-assets.com/authors/1362814142p8/3389.jpg",
      },
    ],
    notableWorks: ["Mystic River", "Gone, Baby, Gone", "Shutter Island"],
    description:
      'Dennis Lehane is known for his gritty and emotionally charged crime dramas. His novel "Mystic River" was adapted into an Oscar-winning film, and his Kenzie and Gennaro series has garnered a dedicated following. Lehane\'s work often explores themes of identity, loyalty, and the moral complexities of justice, set against the backdrop of his native Boston.',
    authorName: "Dennis Lehane",
    awards: ["Edgar Award", "Anthony Award"],
    nationality: "American",
  },
  {
    id: "UGHOlhQpE6cDgX2G5ORI",
    genres: ["Psychological Thriller", "Crime Fiction", "Mystery"],
    coverPhoto: "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
    birthYear: 1971,
    authorName: "Gillian Flynn",
    notableWorks: ["Gone Girl", "Sharp Objects", "Dark Places"],
    description:
      'Gillian Flynn, known for her dark and twisted psychological thrillers, has captivated readers with her sharp prose and intricate plots. Her novel "Gone Girl" not only topped bestseller lists but also sparked discussions about unreliable narrators and toxic relationships. Flynn\'s work delves into the complexities of human nature, exploring themes of deceit, revenge, and moral ambiguity.',
    similarAuthors: [
      {
        name: "Ruth Ware",
        authorId: "fEZQeMiwsA6UrlaIiHYI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1562697198p8/9013543.jpg",
      },
      {
        name: "Dennis Lehane",
        authorId: "TuHW1GhCEphCvgtNlWUT",
        coverPhoto:
          "https://images.gr-assets.com/authors/1227580381p8/10289.jpg",
      },
      {
        name: "Stieg Larsson",
        authorId: "6FVsG66zmMJUucWtkXIB",
        coverPhoto:
          "https://images.gr-assets.com/authors/1595150953p8/706255.jpg",
      },
    ],
    nationality: "American",
    awards: ["Edgar Award for Best First Novel"],
  },
  {
    id: "ZxXo2nykdhn0yxXylHIT",
    genres: ["Mystery", "Crime Fiction", "Detective Fiction"],
    coverPhoto: "https://images.gr-assets.com/photos/1379448055p8/848499.jpg",
    birthYear: 1890,
    description:
      'Agatha Christie, the "Queen of Mystery", has enthralled readers for decades with her ingenious plots and memorable characters. Her detectives, Hercule Poirot and Miss Marple, have become literary icons. Christie\'s masterful storytelling and intricate puzzles have made her the best-selling novelist of all time, with her works translated into countless languages and adapted into numerous films and television series.',
    notableWorks: ["Murder on the Orient Express", "And Then There Were None"],
    authorName: "Agatha Christie",
    deathYear: 1976,
    similarAuthors: [
      {
        name: "Kathy Reichs",
        authorId: "LVdgInSYEHCFB80CGIPJ",
        coverPhoto:
          "https://images.gr-assets.com/authors/1407166867p8/26372.jpg",
      },
      {
        name: "Tom Clancy",
        authorId: "4FjFVFsgbnY6h046jymu",
        coverPhoto:
          "https://images.gr-assets.com/authors/1642083377p8/3892.jpg",
      },
      {
        name: "Robert Galbraith",
        authorId: "h1yhji1PZg5RYv4l1Xn5",
        coverPhoto:
          "https://images.gr-assets.com/authors/1596216614p8/1077326.jpg",
      },
    ],
    awards: ["New York Drama Critics' Circle Award"],
    nationality: "British",
  },
  {
    id: "di1wyyMioqFeLnxqa2wa",
    birthYear: 1954,
    genres: ["Thriller", "Crime Fiction", "Mystery"],
    coverPhoto: "https://images.gr-assets.com/authors/1377708686p8/5091.jpg",
    nationality: "British",
    awards: ["Diamond Dagger award from the Crime Writers' Association"],
    notableWorks: ["Killing Floor", "One Shot", "The Sentinel"],
    description:
      "Lee Child, the creator of the iconic Jack Reacher series, has captivated readers with his tough, no-nonsense protagonist. Reacher, a former military police major, drifts through the United States, righting wrongs and seeking justice. Child's meticulous attention to detail and action-packed plots have garnered a loyal following, and his books consistently top bestseller lists.",
    authorName: "Lee Child",
    similarAuthors: [
      {
        name: "Gillian Flynn",
        authorId: "UGHOlhQpE6cDgX2G5ORI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
      },
      {
        name: "Agatha Christie",
        authorId: "ZxXo2nykdhn0yxXylHIT",
        coverPhoto:
          "https://images.gr-assets.com/photos/1379448055p8/848499.jpg",
      },
      {
        name: "Patricia Highsmith",
        authorId: "sxEteLIzNze1Sh5Z0XYU",
        coverPhoto:
          "https://images.gr-assets.com/authors/1418715271p5/7622.jpg",
      },
    ],
  },
  {
    id: "fEZQeMiwsA6UrlaIiHYI",
    genres: ["Psychological Thriller", "Mystery", "Crime Fiction"],
    coverPhoto: "https://images.gr-assets.com/authors/1562697198p8/9013543.jpg",
    birthYear: 1977,
    notableWorks: [
      "The Woman in Cabin 10",
      "In a Dark, Dark Wood",
      "The Turn of the Key",
    ],
    description:
      'Ruth Ware is a British author known for her modern take on the classic murder mystery. Her novels, such as "The Woman in Cabin 10" and "The Turn of the Key", feature unreliable narrators, claustrophobic settings, and twisty plots that keep readers guessing. Ware\'s ability to create tension and build suspense has earned her comparisons to Agatha Christie and a dedicated fanbase.',
    authorName: "Ruth Ware",
    similarAuthors: [
      {
        name: "Gillian Flynn",
        authorId: "UGHOlhQpE6cDgX2G5ORI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
      },
      {
        name: "Robert Galbraith",
        authorId: "h1yhji1PZg5RYv4l1Xn5",
        coverPhoto:
          "https://images.gr-assets.com/authors/1596216614p8/1077326.jpg",
      },
      {
        name: "Stieg Larsson",
        authorId: "6FVsG66zmMJUucWtkXIB",
        coverPhoto:
          "https://images.gr-assets.com/authors/1595150953p8/706255.jpg",
      },
    ],
    awards: ["Goodreads Choice Awards Best Mystery & Thriller"],
    nationality: "British",
  },
  {
    id: "faelnkQT2HjK5QNvCEF2",
    coverPhoto: "https://images.gr-assets.com/authors/1305944481p8/1612.jpg",
    genres: ["Crime Fiction", "Thriller", "Mystery"],
    birthYear: 1950,
    similarAuthors: [
      {
        name: "Harlan Coben",
        authorId: "zwU7Qyb7EnoTd84X44Zr",
        coverPhoto:
          "https://images.gr-assets.com/authors/1642188401p8/24689.jpg",
      },
      {
        name: "Mary Higgins Clark",
        authorId: "sAyCui2C5jiGrkBcqUcy",
        coverPhoto:
          "https://images.gr-assets.com/authors/1415136162p8/99044.jpg",
      },
      {
        name: "Stephen King",
        authorId: "7TnUxyewxyEXcoMtF9ig",
        coverPhoto:
          "https://images.gr-assets.com/authors/1362814142p8/3389.jpg",
      },
    ],
    authorName: "Jeffery Deaver",
    notableWorks: [
      "The Bone Collector",
      "The Coffin Dancer",
      "The Broken Window",
    ],
    description:
      'Jeffery Deaver is renowned for his meticulous and twist-filled plots. His Lincoln Rhyme series, featuring a quadriplegic forensic detective, has been particularly acclaimed, with "The Bone Collector" adapted into a successful film. Deaver\'s skill in creating suspense and his deep knowledge of forensic science make his novels both thrilling and intellectually stimulating.',
    awards: ["Edgar Award", "Ian Fleming Steel Dagger"],
    nationality: "American",
  },
  {
    id: "h1yhji1PZg5RYv4l1Xn5",
    awards: ["British Book Awards Crime & Thriller Book of the Year"],
    nationality: "British",
    similarAuthors: [
      {
        name: "Tom Clancy",
        authorId: "4FjFVFsgbnY6h046jymu",
        coverPhoto:
          "https://images.gr-assets.com/authors/1642083377p8/3892.jpg",
      },
      {
        name: "Thomas Harris",
        authorId: "vq4Bzq2kksbOs3t9HfW2",
        coverPhoto:
          "https://images.gr-assets.com/authors/1602363825p8/12455.jpg",
      },
      {
        name: "Paula Hawkins",
        authorId: "TH6H1h2zdPuRp7iXIsVF",
        coverPhoto:
          "https://images.gr-assets.com/authors/1492111911p8/1063732.jpg",
      },
    ],
    notableWorks: ["The Cuckoo's Calling", "The Silkworm", "Career of Evil"],
    description:
      "Robert Galbraith is the pen name of J.K. Rowling, best known for her Harry Potter series. Under this pseudonym, Rowling writes crime fiction novels featuring private investigator Cormoran Strike. The use of a pen name allowed Rowling to receive unbiased feedback on her work. The Cormoran Strike series has been praised for its intricate plots and complex characters, cementing Rowling's versatility as a writer beyond the magical world of Harry Potter.",
    authorName: "Robert Galbraith",
    birthYear: 1965,
    coverPhoto: "https://images.gr-assets.com/authors/1596216614p8/1077326.jpg",
    genres: ["Crime Fiction", "Mystery", "Detective Fiction"],
  },
  {
    id: "l80qJuAd9l33gdUPRpTM",
    nationality: "American",
    awards: ["Galaxy British Book Awards"],
    similarAuthors: [
      {
        name: "Thomas Harris",
        authorId: "vq4Bzq2kksbOs3t9HfW2",
        coverPhoto:
          "https://images.gr-assets.com/authors/1602363825p8/12455.jpg",
      },
      {
        name: "Tana French",
        authorId: "7NZwDJjkIGMsLvX1X64K",
        coverPhoto:
          "https://images.gr-assets.com/authors/1535655031p8/138825.jpg",
      },
      {
        name: "Linwood Barclay",
        authorId: "vTHNkRI37jIOt7mraj7C",
        coverPhoto:
          "https://images.gr-assets.com/authors/1418584169p8/458771.jpg",
      },
    ],
    notableWorks: ["A Time to Kill", "The Firm", "The Pelican Brief"],
    description:
      "John Grisham, a former attorney, brings the legal world to life in his compelling courtroom dramas. His debut novel, \"A Time to Kill\", was a critical success, paving the way for a prolific career. Grisham's novels often highlight themes of justice and corruption, providing readers with an insider's view of the legal system. His ability to weave intricate legal battles with personal stories has made him a household name.",
    authorName: "John Grisham",
    birthYear: 1955,
    coverPhoto: "https://images.gr-assets.com/authors/1650547491p5/721.jpg",
    genres: ["Legal Thriller", "Crime Fiction", "Suspense"],
  },
  {
    id: "lWJQd2NWxF6SEeTs9rT9",
    genres: ["Spy Fiction", "Thriller", "Adventure"],
    coverPhoto: "https://images.gr-assets.com/authors/1597472804p8/5293.jpg",
    birthYear: 1927,
    authorName: "Robert Ludlum",
    description:
      "Robert Ludlum, the master of the modern thriller, is best known for creating the Jason Bourne series. His novels are characterized by their complex plots, intense action, and global intrigue. Ludlum's works have been adapted into blockbuster films, and his influence on the genre is evident in the many authors who have followed in his footsteps.",
    notableWorks: [
      "The Bourne Identity",
      "The Matarese Circle",
      "The Parsifal Mosaic",
    ],
    similarAuthors: [
      {
        name: "Tom Clancy",
        authorId: "4FjFVFsgbnY6h046jymu",
        coverPhoto:
          "https://images.gr-assets.com/authors/1642083377p8/3892.jpg",
      },
      {
        name: "Gillian Flynn",
        authorId: "UGHOlhQpE6cDgX2G5ORI",
        coverPhoto:
          "https://images.gr-assets.com/authors/1232123231p8/2383.jpg",
      },
      {
        name: "Thomas Harris",
        authorId: "vq4Bzq2kksbOs3t9HfW2",
        coverPhoto:
          "https://images.gr-assets.com/authors/1602363825p8/12455.jpg",
      },
    ],
    deathYear: 2001,
    awards: ["Japan Adventure Fiction Association Prize"],
    nationality: "American",
  },
  {
    id: "oDCFKEozEeeG3CksrCWA",
    birthYear: 1956,
    genres: ["Crime Fiction", "Detective Fiction", "Legal Thriller"],
    coverPhoto: "https://images.gr-assets.com/authors/1539114448p8/12470.jpg",
    awards: ["Edgar Award", "Anthony Award"],
    nationality: "American",
    authorName: "Michael Connelly",
    description:
      "Michael Connelly, a former crime reporter, brings authenticity and grit to his detective novels. His Harry Bosch series, featuring a relentless LAPD detective, has earned critical acclaim and a devoted readership. Connelly's meticulous research and realistic portrayals of police work make his novels compelling and thought-provoking, shedding light on the complexities of the justice system.",
    notableWorks: ["The Black Echo", "The Lincoln Lawyer", "The Poet"],
    similarAuthors: [
      {
        name: "Stephen King",
        authorId: "7TnUxyewxyEXcoMtF9ig",
        coverPhoto:
          "https://images.gr-assets.com/authors/1362814142p8/3389.jpg",
      },
      {
        name: "Tana French",
        authorId: "7NZwDJjkIGMsLvX1X64K",
        coverPhoto:
          "https://images.gr-assets.com/authors/1535655031p8/138825.jpg",
      },
      {
        name: "Jo Nesbo",
        authorId: "rNhY1DcFjoRpBYG2EIzz",
        coverPhoto:
          "https://images.gr-assets.com/authors/1493220079p8/904719.jpg",
      },
    ],
  },
  {
    id: "rNhY1DcFjoRpBYG2EIzz",
    awards: ["Glass Key Award", "Palle Rosenkrantz Prize"],
    nationality: "Norwegian",
    description:
      "Jo Nesbo, a former musician and economist, has become one of Norway's most successful authors with his Harry Hole series. His dark, intricate plots and flawed yet compelling protagonist have captivated readers worldwide. Nesbo's novels often explore the psychological depths of his characters, set against the backdrop of Norway's stark and beautiful landscapes.",
    notableWorks: ["The Snowman", "The Redbreast", "Knife"],
    authorName: "Jo Nesbo",
    similarAuthors: [
      {
        name: "Dean Koontz",
        authorId: "R8lKSYEm1i1G9RSBXyaf",
        coverPhoto:
          "https://images.gr-assets.com/authors/1581963714p8/9355.jpg",
      },
      {
        name: "Mary Higgins Clark",
        authorId: "sAyCui2C5jiGrkBcqUcy",
        coverPhoto:
          "https://images.gr-assets.com/authors/1415136162p8/99044.jpg",
      },
      {
        name: "Jeffery Deaver",
        authorId: "faelnkQT2HjK5QNvCEF2",
        coverPhoto:
          "https://images.gr-assets.com/authors/1305944481p8/1612.jpg",
      },
    ],
    birthYear: 1960,
    genres: ["Crime Fiction", "Thriller", "Nordic Noir"],
    coverPhoto: "https://images.gr-assets.com/authors/1493220079p8/904719.jpg",
  },
  {
    id: "sAyCui2C5jiGrkBcqUcy",
    awards: ["Grand Master Award from Mystery Writers of America"],
    nationality: "American",
    notableWorks: [
      "Where Are the Children?",
      "A Stranger Is Watching",
      "The Cradle Will Fall",
    ],
    description:
      "Mary Higgins Clark, often referred to as the 'Queen of Suspense', was an American author of suspense novels. With a career spanning several decades, Clark's books have sold over 100 million copies in the United States alone. Her storytelling often revolves around strong female protagonists facing life-threatening situations. Clark's own life experiences, including losing her husband at a young age, deeply influenced her writing. Her works have been translated into multiple languages, captivating readers worldwide.",
    authorName: "Mary Higgins Clark",
    deathYear: 2020,
    similarAuthors: [
      {
        name: "Tana French",
        authorId: "7NZwDJjkIGMsLvX1X64K",
        coverPhoto:
          "https://images.gr-assets.com/authors/1535655031p8/138825.jpg",
      },
      {
        name: "David Baldacci",
        authorId: "TmpMz5rDqKiQ13qhRach",
        coverPhoto:
          "https://images.gr-assets.com/authors/1712679518p8/9291.jpg",
      },
      {
        name: "Robert Galbraith",
        authorId: "h1yhji1PZg5RYv4l1Xn5",
        coverPhoto:
          "https://images.gr-assets.com/authors/1596216614p8/1077326.jpg",
      },
    ],
    birthYear: 1927,
    genres: ["Suspense", "Mystery", "Psychological Thriller"],
    coverPhoto: "https://images.gr-assets.com/authors/1415136162p8/99044.jpg",
  },
  {
    id: "sxEteLIzNze1Sh5Z0XYU",
    genres: ["Psychological Thriller", "Crime Fiction", "Suspense"],
    coverPhoto: "https://images.gr-assets.com/authors/1418715271p5/7622.jpg",
    birthYear: 1921,
    authorName: "Patricia Highsmith",
    notableWorks: ["Strangers on a Train", "The Talented Mr. Ripley"],
    description:
      'Patricia Highsmith is renowned for her psychological thrillers that delve into the darker aspects of the human psyche. Her novel "Strangers on a Train" was famously adapted by Alfred Hitchcock, and her "Ripliad" series explores the life of the charming yet sociopathic Tom Ripley. Highsmith\'s works are characterized by their complex characters and moral ambiguity, leaving readers questioning the nature of good and evil.',
    similarAuthors: [
      {
        name: "Karin Slaughter",
        authorId: "9Qh4JG0uum2Eq7rCjVtr",
        coverPhoto:
          "https://images.gr-assets.com/authors/1565730670p8/12504.jpg",
      },
      {
        name: "Lee Child",
        authorId: "di1wyyMioqFeLnxqa2wa",
        coverPhoto:
          "https://images.gr-assets.com/authors/1377708686p8/5091.jpg",
      },
      {
        name: "Dan Brown",
        authorId: "JOipGAf0t7SKGtyrpUCZ",
        coverPhoto:
          "https://ew.com/thmb/A2EMGBA98MF_E_NTb6-8NKfz56w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dan-brown-2000-83001493b69e442cae02620306e58eac.jpg",
      },
    ],
    deathYear: 1995,
    awards: ["O. Henry Award"],
    nationality: "American",
  },
  {
    id: "vTHNkRI37jIOt7mraj7C",
    genres: ["Thriller", "Mystery", "Suspense"],
    coverPhoto: "https://images.gr-assets.com/authors/1418584169p8/458771.jpg",
    birthYear: 1955,
    authorName: "Linwood Barclay",
    notableWorks: [
      "No Time for Goodbye",
      "Trust Your Eyes",
      "A Tap on the Window",
    ],
    description:
      "Linwood Barclay is an American-born Canadian author renowned for his detective novels and thrillers. Before turning to writing full-time, Barclay had a successful career as a newspaper columnist. His breakthrough novel, 'No Time for Goodbye', became an international bestseller, solidifying his reputation for crafting gripping, suspenseful narratives. Barclay often sets his novels in small towns, where he explores ordinary people in extraordinary situations.",
    similarAuthors: [
      {
        name: "Stephen King",
        authorId: "7TnUxyewxyEXcoMtF9ig",
        coverPhoto:
          "https://images.gr-assets.com/authors/1362814142p8/3389.jpg",
      },
      {
        name: "James Patterson",
        authorId: "GNxqiMsI35DOZMKzN5Jv",
        coverPhoto:
          "https://cdn.britannica.com/99/220799-050-8E06F837/American-author-James-Patterson.jpg",
      },
      {
        name: "Harlan Coben",
        authorId: "zwU7Qyb7EnoTd84X44Zr",
        coverPhoto:
          "https://images.gr-assets.com/authors/1642188401p8/24689.jpg",
      },
    ],
    awards: ["Arthur Ellis Award"],
    nationality: "Canadian",
  },
  {
    id: "vq4Bzq2kksbOs3t9HfW2",
    birthYear: 1940,
    coverPhoto: "https://images.gr-assets.com/authors/1602363825p8/12455.jpg",
    genres: ["Thriller", "Horror", "Crime Fiction"],
    awards: ["Bram Stoker Award", "Anthony Award"],
    nationality: "American",
    similarAuthors: [
      {
        name: "Lisa Gardner",
        authorId: "9NzR5Sj2a1dMMcMxJTXv",
        coverPhoto:
          "https://images.gr-assets.com/authors/1395879573p8/18282.jpg",
      },
      {
        name: "David Baldacci",
        authorId: "TmpMz5rDqKiQ13qhRach",
        coverPhoto:
          "https://images.gr-assets.com/authors/1712679518p8/9291.jpg",
      },
      {
        name: "Mary Higgins Clark",
        authorId: "sAyCui2C5jiGrkBcqUcy",
        coverPhoto:
          "https://images.gr-assets.com/authors/1415136162p8/99044.jpg",
      },
    ],
    authorName: "Thomas Harris",
    notableWorks: ["The Silence of the Lambs", "Red Dragon", "Hannibal"],
    description:
      'Thomas Harris is the author behind one of the most iconic characters in fiction, Hannibal Lecter. His novel "The Silence of the Lambs" won multiple awards and was adapted into an Oscar-winning film. Harris\'s chilling and atmospheric storytelling, combined with his deep understanding of criminal psychology, has made his work a cornerstone of the thriller genre.',
  },
  {
    id: "zwU7Qyb7EnoTd84X44Zr",
    awards: ["Edgar Award", "Shamus Award"],
    nationality: "American",
    authorName: "Harlan Coben",
    notableWorks: ["Tell No One", "Gone for Good", "The Woods"],
    description:
      "Harlan Coben, known for his gripping and twist-filled mystery novels, has a knack for keeping readers guessing until the last page. His standalone novels and Myron Bolitar series are beloved for their complex plots and engaging characters. Coben's ability to weave suspense with deep emotional undercurrents has made him a mainstay on bestseller lists and a favorite among thriller enthusiasts.",
    similarAuthors: [
      {
        name: "Paula Hawkins",
        authorId: "TH6H1h2zdPuRp7iXIsVF",
        coverPhoto:
          "https://images.gr-assets.com/authors/1492111911p8/1063732.jpg",
      },
      {
        name: "Robert Ludlum",
        authorId: "lWJQd2NWxF6SEeTs9rT9",
        coverPhoto:
          "https://images.gr-assets.com/authors/1597472804p8/5293.jpg",
      },
      {
        name: "Dennis Lehane",
        authorId: "TuHW1GhCEphCvgtNlWUT",
        coverPhoto:
          "https://images.gr-assets.com/authors/1227580381p8/10289.jpg",
      },
    ],
    birthYear: 1962,
    genres: ["Mystery", "Thriller", "Suspense"],
    coverPhoto: "https://images.gr-assets.com/authors/1642188401p8/24689.jpg",
  },
];

const IMAGE_DIR = path.join(__dirname, "public", "images", "authors");

// 1. Create the folder if it doesn't exist
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  console.log("📁 Created directory: /public/images/authors");
}

// Helper to download an image
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 200) {
          res
            .pipe(fs.createWriteStream(filepath))
            .on("error", reject)
            .once("close", () => resolve(filepath));
        } else {
          res.resume();
          reject(new Error(`Failed with status: ${res.statusCode}`));
        }
      })
      .on("error", reject);
  });
};

const processAuthors = async () => {
  console.log("🚀 Starting image downloads...\n");
  const updatedAuthors = [];

  for (const author of authors) {
    // 2. Download the main cover photo
    if (author.coverPhoto && author.coverPhoto.startsWith("http")) {
      const filename = `${author.authorName}.jpg`;
      const filepath = path.join(IMAGE_DIR, filename);

      try {
        await downloadImage(author.coverPhoto, filepath);
        console.log(`✅ Downloaded: ${author.authorName}`);

        // Update the path in the object to point to the local public folder
        author.coverPhoto = `/images/authors/${filename}`;
      } catch (err) {
        console.error(
          `❌ Failed to download ${author.authorName}: ${err.message}`,
        );
      }
    }

    // 3. Update the similarAuthors paths to match the new local structure
    if (author.similarAuthors) {
      for (const sim of author.similarAuthors) {
        if (sim.coverPhoto && sim.coverPhoto.startsWith("http")) {
          sim.coverPhoto = `/images/authors/${sim.authorId}.jpg`;
        }
      }
    }

    updatedAuthors.push(author);
  }

  // 4. Generate the new data file
  const fileContent = `const authors = ${JSON.stringify(updatedAuthors, null, 2)};\n\nexport default authors;`;
  const newFilePath = path.join(__dirname, "src", "data", "authors_local.js");

  fs.writeFileSync(newFilePath, fileContent);
  console.log("\n🎉 All done! Saved updated data to src/data/authors_local.js");
};

processAuthors();
