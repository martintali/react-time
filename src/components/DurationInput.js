import React from 'react';

class DurationInput extends React.Component {
  state = { timeRemaining: 3 } 

  constructor(props) {
    super(props);

    this.timeRemainingRef = React.createRef();
  }

  onTimeRemainingChanged = (e) => {
    this.setState({ timeRemaining: e.target.value });
  }

  start = () => {
    if (this.props.onStart) {
      this.props.onStart(this.state.timeRemaining);
    }
    this.tick()
    this.interval = setInterval(this.tick, 50);
  }

  tick = () => {
    if (this.state.timeRemaining <= 0) {
      this.pause();
      
      if (this.props.onComplete)
        this.props.onComplete();
    } else {
      this.setState(state => ({
        timeRemaining: (state.timeRemaining - 0.05).toFixed(2),
      }));

      if (this.props.onTick) {
        this.props.onTick(this.state.timeRemaining);
      }
    }
  }

  pause = () => {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="controls ui cards">
        <div className="content">
          <input id="timeRemaining" ref={this.timeRemainingRef} value={this.state.timeRemaining} onChange={this.onTimeRemainingChanged}/>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <button className="ui button" onClick={this.start}>
              <i className="play icon"></i>
            </button>
            <button className="ui button" onClick={this.pause}>
              <i className="pause icon"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DurationInput;