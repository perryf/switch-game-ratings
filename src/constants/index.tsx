import {
  GameImagesType,
  GameInfoType,
  MyDataType,
  SwitchGameBasicType
} from '../interfaces'

export const gameInfoInit: GameInfoType = {
  developers: [],
  engine: '',
  esrbDescriptors: [],
  esrbRating: '',
  fileSize: '',
  freeToStart: false,
  generalFilters: [],
  genres: [],
  lengthOfGame: '',
  msrp: 0.0,
  numOfPlayers: '',
  playerFilters: [],
  publishers: [],
  remake: false,
  slug: '',
  tags: []
}

export const imagesInit: GameImagesType = {
  boxart: '',
  descriptionImage: '',
  horizontalHeaderImage: ''
}

export const myDataInit: MyDataType = {
  datePlayed: '',
  datePurchased: '',
  emulatorSystem: '',
  isEmulator: false,
  physicalCopy: false,
  played: false,
  rating: 0,
  review: ''
}

export const newGameInit: SwitchGameBasicType = {
  title: '',
  displayTitle: '',
  description: '',
  releaseDateDisplay: new Date().toISOString().slice(0, 10),
  gameInfo: gameInfoInit,
  images: imagesInit,
  myData: myDataInit
}

export const gameLengths: string[] = ['short', 'medium', 'long']
export const emulatorSystems: string[] = [
  'gameboy',
  'gba',
  'n64',
  'nes',
  'sega',
  'snes'
]

export const switchGenreList: { name: string; value: string }[] = [
  { name: 'Action', value: 'Action' },
  { name: 'Adventure', value: 'Adventure' },
  { name: 'Arcade', value: 'Arcade' },
  { name: 'Board Game', value: 'Board game' },
  { name: 'Fighting', value: 'Fighting' },
  { name: 'First-Person', value: 'First-person' },
  { name: 'Fitness', value: 'Fitness' },
  { name: 'Indie', value: 'Indie' },
  { name: 'Metroidvania', value: 'metroidvania' },
  { name: 'Multiplayer', value: 'Multiplayer' },
  { name: 'Music', value: 'Music' },
  { name: 'Other', value: 'Other' },
  { name: 'Party', value: 'Party' },
  { name: 'Platformer', value: 'Platformer' },
  { name: 'Puzzle', value: 'Puzzle' },
  { name: 'Racing', value: 'Racing' },
  { name: 'Role-Playing', value: 'Role-playing' },
  { name: 'Simulation', value: 'Simulation' },
  { name: 'Sports', value: 'Sports' },
  { name: 'Strategy', value: 'Strategy' },
  { name: 'Training', value: 'Training' }
]
