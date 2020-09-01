const { practice } = require('./practice')
const { nomore } = require('./nomore')
const { forcepractice } = require('./forcepractice')
const { forcestop } = require('./forcestop')
const { np } = require('./np')
const { song } = require('./song')
const { excuse } = require('./excuse')
const { unexcuse } = require('./unexcuse')
const { help, modcommands } = require('./views/help')
const {enablechs, disablechs} = require('./configurechannels')
const { stats, serverstats } = require('./stats')
const {leaderboard} = require('./leaderboard')

module.exports = {
    practice,
    nomore,
    forcepractice,
    forcestop,
    np,
    song,
    excuse,
    unexcuse,
    help,
    enablechs,
    disablechs,
    stats,
    serverstats,
    leaderboard,
    modcommands
}