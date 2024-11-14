interface GameImages {
  boxart: string
  descriptionImage: string
  horizontalHeaderImage: string
}

interface GameInfo {
  developers: string[]
  engine: string
  esrbDescriptors: string[]
  esrbRating: string
  fileSize: string
  freeToStart: boolean
  generalFilters: string[]
  genres: string[]
  lengthOfGame: string // enum: short, medium, or long
  mood: string[] // chill, fast-paced, funny, etc
  msrp: number
  numOfPlayers: string
  playerFilters: string[]
  publishers: string[]
  remake: boolean
  slug: string
}

interface MyData {
  datePlayed: string
  datePurchased: string
  emulatorSystem: string
  isEmulator: boolean
  physicalCopy: boolean
  played: boolean
  rating: number // 1 -5
  review: string
}

export interface SwitchGameBasic {
  title: string
  description: string
  displayTitle: string
  releaseDateDisplay: Date
  images: GameImages
  gameInfo: GameInfo
  myData: MyData
}

export interface SwitchGameType extends SwitchGameBasic {
  id: string
}
