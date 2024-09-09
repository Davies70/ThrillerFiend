
export const setSome = (set, callback) => {
  for (const value of set) {
    if (callback(value)) {
      return true;
    }
  }
  return false;
};

export function timeAgo(timeStamp) {
  const now = new Date();
  const secondsPast = (now.getTime() - timeStamp) / 1000;

  if (secondsPast < 60) {
    return `just now`;
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)} minutes ago`;
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)} hours ago`;
  }
  if (secondsPast < 172800) {
    // less than 2 days
    return `yesterday`;
  }
  if (secondsPast < 604800) {
    // less than 7 days
    return `${Math.floor(secondsPast / 86400)} days ago`;
  }
  return `${Math.floor(secondsPast / 604800)} weeks ago`;
}

export const getLanguage = (language) => {
  switch (language) {
    case 'en':
      return 'English';
    case 'es':
      return 'Spanish';
    case 'fr':
      return 'French';
    case 'de':
      return 'German';
    case 'it':
      return 'Italian';
    case 'pt':
      return 'Portuguese';
    case 'nl':
      return 'Dutch';
    case 'ru':
      return 'Russian';
    case 'ja':
      return 'Japanese';
    case 'ko':
      return 'Korean';
    case 'ar':
      return 'Arabic';
    case 'zh':
      return 'Chinese';
    default:
      return language;
  }
};
