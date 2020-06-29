const { practice } = require('./practice')
const { nomore } = require('./nomore')
const { forcepractice } = require('./forcepractice')
const { forcestop } = require('./forcestop')
const { np } = require('./np')
const { song } = require('./song')
const { excuse } = require('./excuse')
const { unexcuse } = require('./unexcuse')
const { help } = require('./views/help')
const {enablechs, disablechs} = require('./configurechannels')
const { stats, serverStats } = require('./stats')

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
    serverStats
}