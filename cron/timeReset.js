var cron = require('node-cron');
const { resetServerTimePracticed } = require('../cloud/dbutils')

//every day at 12am EST
cron.schedule('0 0 0 * * *', function(task) {
    console.log("now resetting daily practicer timer");
    resetServerTimePracticed("dailyTotal");
}, {
    scheduled: true,
    timezone: "America/New_York"
})

//every monday 12am EST
cron.schedule('0 0 0 * * 1', function(task) {
    console.log("now resetting weekly practicer timer");
    resetServerTimePracticed("weeklyTotal");
}, {
    scheduled: true,
    timezone: "America/New_York"
})

//every month 12am EST
cron.schedule('0 0 0 1 * *', function(task) {
    console.log("now resetting monthly practicer timer");
    resetServerTimePracticed("monthlyTotal");
}, {
    scheduled: true,
    timezone: "America/New_York"
})

//start of the year Jan 1st 12am EST
cron.schedule('0 0 0 1 1 *', function(task) {
    console.log("now resetting yearly practicer timer");
    resetServerTimePracticed("yearlyTotal");
}, {
    scheduled: true,
    timezone: "America/New_York"
})