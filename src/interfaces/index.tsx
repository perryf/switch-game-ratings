export interface GameInfoType {
  developers: string[] | string // TODO -> revisit types -- this has 2 because editing easier as strings
  engine: string
  esrbDescriptors: string[] | string
  esrbRating: string
  fileSize: string
  freeToStart: boolean
  generalFilters: string[] | string
  genres: string[] | string
  lengthOfGame: string // enum: short, medium, or long
  msrp: number
  numOfPlayers: string
  playerFilters: string[] | string
  publishers: string[] | string
  remake: boolean
  slug: string
  tags: string[] // chill, fast-paced, funny, etc
}

export interface MyDataType {
  datePlayed: string
  datePurchased: string
  emulatorSystem: string
  isEmulator: boolean
  physicalCopy: boolean
  played: boolean
  rating: number // 1 - 5
  review: string
}

export interface GameImagesType {
  boxart: string
  descriptionImage: string
  horizontalHeaderImage: string
}

export interface SwitchGameBasicType {
  title: string
  description: string
  displayTitle: string
  releaseDateDisplay: string // ? date?
  images: GameImagesType
  gameInfo: GameInfoType
  myData: MyDataType
  startEdit?: Function
  id?: number
}

// export interface SwitchGameEditType extends SwitchGameBasicType {
//   id: string
// }
