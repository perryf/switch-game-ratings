interface SwitchGameBasic {
  datePlayed?: string // ? Date?
  developedBy?: string
  genre?: string[]
  imagePath?: string
  imagePathSmall?: string
  lengthOfGame?: string
  multiplayer?: false
  multiplayerNumberOfPlayers: number
  name: string
  onlineFeatures?: boolean
  onlineMultiplayer?: boolean
  price: number
  publishedBy?: string
  rating: number // 1 -5
  recommended?: boolean
  releaseDate?: string
  remake?: boolean
  review?: string
}

export interface SwitchGameTypeNew extends SwitchGameBasic {
  mood?: string // turn into an array on submit
  multiplayerType?: string // turn into array on submit
  tags?: string // turn into array on submit
}

export interface SwitchGameType extends SwitchGameTypeNew {
  id: string
}
