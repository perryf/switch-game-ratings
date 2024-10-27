export interface SwitchGameTypeNew {
  datePlayed?: string // ? Date?
  developedBy?: string
  genre?: string[]
  imagePath?: string
  imagePathSmall?: string
  multiplayer?: false
  multiplayerType?: string[]
  multiplayerNumberOfPlayers?: number
  mood?: string // turn into an array on submit
  name: string
  onlineFeatures: boolean
  onlineMultiplayer: boolean
  price: number
  publishedBy?: string
  releaseDate?: string
  rating?: number // 1 -5
  recommended?: boolean
  remake?: boolean
  review?: string
  tags?: string // turn into array on submit
}

export interface SwitchGameType extends SwitchGameTypeNew {
  id: string
}
