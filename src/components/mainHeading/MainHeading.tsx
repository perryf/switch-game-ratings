import './main-heading.css'

function MainHeading() {
  const handleTitleClick: () => void = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className="main-heading-box">
      <i className="snes-logo heading-icon" />
      <div className="main-heading-middle">
        <h1 onClick={handleTitleClick}>Switch Game Ratings</h1>

        <a href="https://github.com/perryf" className="perry-github-link">
          <p>by Perry</p>
        </a>
      </div>
      <button className="question-mark-box">?</button>
    </div>
  )
}

export default MainHeading
