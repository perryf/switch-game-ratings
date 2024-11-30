import { getHearts } from '../../helpers'
import './instructions.css'

interface InstructionsProps {
  setShowInstructions: (b: boolean) => void
  showInstructions: boolean
}

function Instructions(props: InstructionsProps) {
  const { setShowInstructions, showInstructions } = props

  return (
    <div className={`instructions ${showInstructions ? 'show' : ''}`}>
      <button
        className="nes-btn close-x-button"
        onClick={() => setShowInstructions(false)}
      >
        X
      </button>
      <p>
        Here's my very subjective rating system. Keep in mind I'm only playing
        games that look decent and I'll think I'll like. Also, I played many of
        these a couple years ago, so going off of memory here.
      </p>
      <ul>
        <li>
          {getHearts(1)}
          <span> = Yikes! Not good, real stinkeroo</span>
        </li>
        <li>
          {getHearts(2)}
          <span>= Eh, not too great. You can probably skip this one.</span>
        </li>
        <li>
          {getHearts(3)}
          <span>
            = Pretty good, may be worth playing if you're into this kind of
            game.
          </span>
        </li>
        <li>
          {getHearts(4)}
          <span>= Great game! Enjoyable, fun, recommended.</span>
        </li>
        <li>
          {getHearts(5)}
          <span>
            = Wow! Amazing! Such game! One of the best games I've played on the
            switch.
          </span>
        </li>
      </ul>
      <button className="nes-btn" onClick={() => setShowInstructions(false)}>
        Close
      </button>
    </div>
  )
}

export default Instructions
