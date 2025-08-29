import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRunning: false,
      timeLimit: 25,
      timeLeft: 25 * 60,
      status: 'Paused',
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onStartPause = () => {
    const {isRunning} = this.state
    if (isRunning) {
      clearInterval(this.timerId)
      this.setState({isRunning: false, status: 'Paused'})
    } else {
      this.setState({isRunning: true, status: 'Running'}, this.startTimer)
    }
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timeLeft > 0) {
          return {timeLeft: prevState.timeLeft - 1}
        } else {
          clearInterval(this.timerId)
          return {isRunning: false, status: 'Paused'}
        }
      })
    }, 1000)
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      isRunning: false,
      timeLimit: 25,
      timeLeft: 25 * 60,
      status: 'Paused',
    })
  }

  onIncrease = () => {
    const {isRunning, timeLimit} = this.state
    if (!isRunning) {
      this.setState({
        timeLimit: timeLimit + 1,
        timeLeft: (timeLimit + 1) * 60,
      })
    }
  }

  onDecrease = () => {
    const {isRunning, timeLimit} = this.state
    if (!isRunning && timeLimit > 1) {
      this.setState({
        timeLimit: timeLimit - 1,
        timeLeft: (timeLimit - 1) * 60,
      })
    }
  }

  formatTime = seconds => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  render() {
    const {isRunning, timeLeft, timeLimit, status} = this.state

    const playPauseIcon = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const playPauseAlt = isRunning ? 'pause icon' : 'play icon'
    const playPauseText = isRunning ? 'Pause' : 'Start'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-display">
            <div className="time-circle">
              <h1 className="time">{this.formatTime(timeLeft)}</h1>
              <p className="status">{status}</p>
            </div>
          </div>

          <div className="controls-container">
            <div className="buttons-row">
              <button
                type="button"
                className="control-btn"
                onClick={this.onStartPause}
              >
                <img src={playPauseIcon} alt={playPauseAlt} className="icon" />
                <p className="btn-label">{playPauseText}</p>
              </button>

              <button
                type="button"
                className="control-btn"
                onClick={this.onReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                <p className="btn-label">Reset</p>
              </button>
            </div>

            <p className="label">Set Timer limit</p>
            <div className="limit-controls">
              <button
                type="button"
                className="limit-btn"
                onClick={this.onDecrease}
                disabled={isRunning}
              >
                -
              </button>
              <p className="limit-value">{timeLimit}</p>
              <button
                type="button"
                className="limit-btn"
                onClick={this.onIncrease}
                disabled={isRunning}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>Designed by Koushik</p>
          <a href="https://github.com/Koushik-26-09" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/koushik26" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    )
  }
}

export default DigitalTimer