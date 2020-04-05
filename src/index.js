import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import DurationInput from './components/DurationInput';

class App extends React.Component{
  state = { timeRemaining: 0, duration: 0 };

  constructor(props) {
    super(props);

    this.svgRef = React.createRef();
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.perimeter = this.svgRef.current.getAttribute('r') * 2 * Math.PI;
    this.svgRef.current.setAttribute('stroke-dasharray', this.perimeter);
  }

  onStart = (totalDuration) => {
    this.setState({ duration: totalDuration });
  }

  onTick = (timeRemaining) => {
    this.setState({ timeRemaining });
    this.svgRef.current.setAttribute(
      'stroke-dashoffset', 
      this.perimeter * this.state.timeRemaining / this.state.duration - this.perimeter
    );
  };

  onComplete = () => {
    this.audioRef.current.currentTime = 0;
    this.audioRef.current.play();
  }

  render() {
    return (
      <div className="timer">
        <DurationInput onStart={this.onStart} onTick={this.onTick} onComplete={this.onComplete}/>
        <svg className="dial">
          <circle
            ref={this.svgRef}
            fill="transparent"
            stroke="green"
            strokeWidth="15"
            r="190"
            cx="0"
            cy="200"
            transform="rotate(-90 100 100)"
          />
        </svg>
        <audio ref={this.audioRef} src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-four/zapsplat_foley_battery_aa_roll_table_002.mp3?_=9"></audio>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
