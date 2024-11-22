// import { Masonry } from 'masonic' // * Not using this for now -- was causing a lot of issues with searching / deleting.  Need to account for position/item/order changes
// import { SwitchGameEditType } from '../../interfaces'
// import { useWindowSize } from '../../hooks/windowSize'
import SwitchGame from '../switchGame/SwitchGame'
import './switch-game-list.css'
import { SwitchGameBasicType } from '../../interfaces'

// const getColumnCount = (windowSize = { width: 0, height: 0 }) => {
//   if (windowSize.width > 1400) return 3
//   if (windowSize.width > 992) return 2
//   return 1
// }

interface SwitchGameTypeEdit extends SwitchGameBasicType {
  startEdit: Function
}

interface SwitchGameListProps {
  games: any
}

function SwitchGameList(props: SwitchGameListProps) {
  const { games } = props
  // const size = useWindowSize()

  return (
    <div className="switch-game-list">
      {/* TODO -> Figure out implementing MasonryScroller or useMasonry -- search & delete not working */}
      {/* <Masonry
        key={games.length}
        items={gameTiles}
        render={SwitchGame}
        columnGutter={4}
        rowGutter={4}
        maxColumnCount={getColumnCount(size)}
        overscanBy={20}
        itemHeightEstimate={350}
      /> */}

      {games.map((game: SwitchGameTypeEdit) => (
        <SwitchGame game={game} key={game.id} />
      ))}
    </div>
  )
}

export default SwitchGameList
