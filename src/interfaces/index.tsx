export interface SwitchGameTypeNew {
  datePlayed?: string // ? Date?
  developedBy?: string
  genre?: string[]
  imagePath?: string
  imagePathSmall?: string
  lengthOfGame?: string
  mood?: string // turn into an array on submit
  multiplayer?: false
  multiplayerNumberOfPlayers: number
  multiplayerType?: string // turn into array on submit
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
  tags?: string // turn into array on submit
}

export interface SwitchGameType extends SwitchGameTypeNew {
  id: string
}
