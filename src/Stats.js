import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {
  getGameNightData,
  getImageUrl,
  getYouTubeSearchUrl,
  getPlayer,
} from './service';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsReady: false,
      data: {
        stats: [],
        unfinishedGames: [],
      },
      // statsReady: true,
      // stats: mockStats,
    };
  }

  componentDidMount() {
    if (this.state.data.stats.length === 0) {
      getGameNightData()
          .then(data => {
            console.log(data);
            this.setState({
              statsReady: true,
              data: data,
            });
          })
          .catch((message) => {
            this.setState({
              statsReady: true,
              message: message,
            });
          });
    }
  }

  render() {
    let {statsReady, message} = this.state;
    let {stats, unfinishedGames} = this.state.data;

    if (statsReady) {
      if (stats.length > 0) {
        return (
            <div>
              <div className="stats">
                {
                  stats.map(
                      ({playerId, goals = null, assists = null, saves = null, shots = null, star = null}) => {
                        let points = '';
                        if (goals || assists) {
                          points = (
                              <div className="card__points">
                                {goals + ' + ' + assists}
                              </div>
                          );
                        } else if (saves && shots) {
                          points = (
                              <div className="card__points">
                                {saves + ' / ' + shots}
                              </div>
                          );
                        }

                        return (
                            <div key={playerId} className="card-container">
                              <a
                                  href={getYouTubeSearchUrl(
                                      getPlayer(playerId).name)}
                                  className="player-link"
                                  target="_blank"
                              >
                                <div className="card">
                                  <div className="card__player">
                                    <img
                                        src={getImageUrl(playerId)}
                                        className="card__headshot"
                                        alt={getPlayer(playerId).name}
                                        title={getPlayer(playerId).name}
                                    />
                                  </div>
                                  {points}
                                  {star &&
                                  <i
                                      className="fa fa-star card__star"
                                      title={star}
                                  >
                                  <span
                                      className="card__star-value">{star}</span>
                                  </i>
                                  }
                                </div>
                              </a>
                            </div>
                        );
                      })
                }
              </div>
              {unfinishedGames.length > 0 &&
                <span>{unfinishedGames.length} games not finished yet.</span>
              }
            </div>

        );
      }
      else {
        return (
            <span>{message}</span>
        );
      }

    }
    else {
      return (
          <span>Loading...</span>
      );
    }
  }
}

export default Stats;