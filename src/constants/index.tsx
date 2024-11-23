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
