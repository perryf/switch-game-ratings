// interface SwitchGameBasic {
//   datePlayed?: string // ? Date?
//   developedBy?: string
//   genre?: string[]
//   imagePath?: string
//   imagePathSmall?: string
//   lengthOfGame?: string
//   multiplayer?: false
//   multiplayerNumberOfPlayers: number
//   name: string
//   onlineFeatures?: boolean
//   onlineMultiplayer?: boolean
//   price: number
//   publishedBy?: string
//   rating: number // 1 -5
//   recommended?: boolean
//   releaseDate?: string
//   remake?: boolean
//   review?: string
// }

export interface SwitchGameTypeNew extends SwitchGameBasic {
  mood?: string // turn into an array on submit
  multiplayerType?: string // turn into array on submit
  tags?: string // turn into array on submit
}

export interface SwitchGameType extends SwitchGameTypeNew {
  id: string
}

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
