import {players} from './data';

const SCHEDULE_URL = 'https://statsapi.web.nhl.com/api/v1/schedule?date=';
const GAME_FEED_URL = 'https://statsapi.web.nhl.com/api/v1/game/[GAME_PK]/feed/live';
const IMAGE_URL = 'http://nhl.bamcontent.com/images/headshots/current/60x60/[PLAYER_ID]@2x.jpg';
const YOU_TUBE_SEARCH_URL = 'https://www.youtube.com/results?search_query=[QUERY]';
const GAME_STATUS_CODES = {
  FINAL: ['6', '7'],
};
const ERROR_MESSAGE = 'Something went wrong.';
const CACHE_VERSION = 3;
const USE_CACHE = true;

let playerIds = Object.keys(players);
let startDate = (new Date());
startDate.setHours(0, 0, 0, 0);
startDate.setDate(startDate.getDate() - 1);
let cacheKey = 'stats' + startDate.getTime() + CACHE_VERSION;

const DEFAULT_SCORE = {
  goals: 0,
  assists: 0,
  shootOutGoals: 0,
};

/**
 * @param value
 * @returns {string}
 */
const addLeadingZero = (value) => {
  return value < 10 ? '0' + value : '' + value;
};

const formatDate = (date) => {
  return date.getFullYear()
      + '-'
      + addLeadingZero(date.getMonth() + 1)
      + '-'
      + addLeadingZero(date.getDate());
};

const fetchGames = () => {
  let date = formatDate(startDate);
  // let date = 'bad-request';
  // let date = '2018-06-06';
  return fetch(SCHEDULE_URL + date)
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject();
        }
        return response.json();
      })
      .then(
          (result) => {
            if (result.totalGames === 0) {
              return Promise.reject('No games today.');
            }
            let games = result.dates[0].games;
            let finished = [];
            let unfinished = [];
            for (let game of games) {
              if (GAME_STATUS_CODES.FINAL.includes(game.status.statusCode)) {
                finished.push(game.gamePk);
              } else {
                unfinished.push(game.gamePk);
              }
            }
            if (finished.length > 0) {
              return Promise.resolve({finished, unfinished});
            } else {
              return Promise.reject('No finished games yet.');
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            return Promise.reject(ERROR_MESSAGE);
          },
      );
};

const addStar = (score, playerId, starValue) => {
  if (!score.hasOwnProperty(playerId)) {
    score[playerId] = {...DEFAULT_SCORE};
  }
  score[playerId].star = starValue;

  return score;
};

const addShootoutGoal = (score, playerId) => {
  if (!score.hasOwnProperty(playerId)) {
    score[playerId] = {...DEFAULT_SCORE};
  }
  score[playerId].shootOutGoals++;

  return score;
};

const fillScore = (score, playersData) => {
  for (let playerId of Object.keys(playersData)) {
    let players = playersData[playerId];
    if (players.position.code === 'G'
        && score.hasOwnProperty(players.person.id)
        && score[players.person.id].star !== undefined) {
      let {saves, shots} = players.stats.goalieStats;
      if (saves && shots) {
        score[players.person.id] = {
          ...score[players.person.id], goals: 0, assists: 0, saves, shots,
        };
      }
    } else if (['C', 'L', 'R', 'D'].includes(players.position.code)) {
      let {goals, assists} = players.stats.skaterStats;
      if (goals || assists) {
        let playerScore = score.hasOwnProperty(players.person.id)
            ? score[players.person.id]
            : {};
        score[players.person.id] = {
          ...playerScore,
          goals,
          assists,
        };
      }
    }
  }

  return score;
};

const fetchScores = (gamePks) => {
  // gamePks = [2017021182];
  return new Promise((resolve, reject) => {
    let processCount = 0;
    let score = {};
    for (let gamePk of gamePks) {
      fetch(GAME_FEED_URL.replace(/\[GAME_PK\]/, gamePk))
          .then(response => response.json())
          .then(
              // eslint-disable-next-line
              (result) => {
                processCount++;

                let {firstStar, secondStar, thirdStar} = result.liveData.decisions;
                // Stars aren't apparently always ready at status 7, so we must check them.
                if (
                  firstStar && secondStar && thirdStar
                ) {
                  score = addStar(score, firstStar.id, 1);
                  score = addStar(score, secondStar.id, 2);
                  score = addStar(score, thirdStar.id, 3);
                }

                let plays =  result.liveData.plays;
                for (let playId of plays.scoringPlays) {
                  let play = plays.allPlays[playId];
                  if (play.about.periodType === 'SHOOTOUT' && play.result.eventTypeId === 'GOAL') {
                    let playerId = play.players.filter(player => player.playerType === 'Scorer').pop().player.id;
                    addShootoutGoal(score, playerId);
                  }
                }

                let {away, home} = result.liveData.boxscore.teams;
                score = fillScore(score, away.players);
                score = fillScore(score, home.players);

                if (processCount === gamePks.length) {
                  resolve(score);
                }
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              // eslint-disable-next-line
              (error) => {
                reject(ERROR_MESSAGE);
              },
          );
    }
  });
};

const parseFinns = (score) => {
  let stats = [];
  for (let playerId of playerIds) {
    if (score.hasOwnProperty(playerId)) {
      stats.push({
        ...score[playerId],
        playerId: playerId,
      });
    }
  }

  return stats;
};

const sortByPoints = (stats) => {
  return stats.sort(
      (statsA, statsB) => {
        if (statsA.star || statsB.star) {
          return (statsA.star ? statsA.star : 4) -
              (statsB.star ? statsB.star : 4);
        }
        if (statsB.goals - statsA.goals !== 0) {
          return statsB.goals - statsA.goals;
        }
        if (statsB.assists - statsA.assists !== 0) {
          return statsB.assists - statsA.assists;
        }
        return 0;
      },
  );
};

/**
 * @param array unfinishedGames
 * @returns {string}
 */
const getCacheKey = (unfinishedGames) => {
  return cacheKey + unfinishedGames.length;
};

export const getGameNightData = () => {
  let cacheKeyA = getCacheKey([]);
  if (USE_CACHE && localStorage.getItem(cacheKeyA)) {
    let data = JSON.parse(localStorage.getItem(cacheKeyA));
    return Promise.resolve(data);
  }

  let unfinishedGames = [];
  return fetchGames()
      .then(games => {
        unfinishedGames = games.unfinished;
        let cacheKeyB = getCacheKey(unfinishedGames);
        if (USE_CACHE && localStorage.getItem(cacheKeyB)) {
          let data = JSON.parse(localStorage.getItem(cacheKeyB));
          return data;
        } else {
          return fetchScores(games.finished)
              .then(score => parseFinns(score))
              .then(stats => sortByPoints(stats))
              .then(stats => {
                localStorage.setItem(
                    cacheKeyB,
                    JSON.stringify({stats, unfinishedGames}),
                );
                return {stats, unfinishedGames};
              });
        }
      });

};

export const getImageUrl = (playerId) => {
  return IMAGE_URL.replace(/\[PLAYER_ID\]/, playerId);
};

export const getYouTubeSearchUrl = (name) => {
  return YOU_TUBE_SEARCH_URL.replace(/\[QUERY\]/, name.replace(/\s/, '+'));
};

export const getPlayer = (playerId) => {
  return players[playerId];
};