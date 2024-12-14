import { Filter } from 'bad-words';

const filter = new Filter();
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|ftp:\/\/[^\s]+)/gi;

const badWords = [
  'idiot',
  'ass',
  'bastard',
  'bitch',
  'bloody',
  'bollocks',
  'bugger',
  'bullshit',
  'crap',
  'cunt',
  'damn',
  'dick',
  'douche',
  'fag',
  'faggot',
  'fuck',
  'goddamn',
  'hell',
  'jerk',
  'kike',
  'motherfucker',
  'nigga',
  'nigger',
  'piss',
  'prick',
  'pussy',
  'shit',
  'slut',
  'spick',
  'twat',
  'wanker',
  'whore',
  'arse',
  'arsehole',
  'balls',
  'bint',
  'bollock',
  'chink',
  'clunge',
  'cock',
  'coon',
  'dickhead',
  'dyke',
  'gash',
  'knob',
  'minger',
  'munter',
  'nonce',
  'paki',
  'slag',
  'tits',
  'tosser',
];

filter.addWords(...badWords);

const checkWords = (newMessage: string) => {
  // Filtrar palabras ofensivas
  let cleanedMessage = filter.clean(newMessage);

  // Reemplazar correos electrónicos
  cleanedMessage = cleanedMessage.replace(emailRegex, '******');

  // Reemplazar URLs
  cleanedMessage = cleanedMessage.replace(urlRegex, '******');

  return cleanedMessage;
};

export default checkWords;
