var cron = require('node-cron');
const mongofuncs = require('./../cloud/mongofuncs');

//every day at 12am EST
cron.schedule('0 0 0 * * *', function(task) {
    console.log("now resetting daily practicer timer");
    mongofuncs.resetServerTimePracticed("dailyTotal");
}, {
    scheduled: true,
    timezone: "America/New_York"
})

//every monday 12am EST
cron.schedule('0 0 0 * * 1', function(task) {
    console.log("now resetting weekly practicer timer");
    mongofuncs.resetServerTimePracticed("weeklyTotal");
}, {
    scheduled: true,
    timezone: "America/New_York"
})

//every month 12am EST
cron.schedule('0 0 0 1 * *', function(task) {
    console.log("now resetting monthly practicer timer");
    mongofuncs.resetServerTimePracticed("monthlyTotal");
}, {
    scheduled: true,
    timezone: "America/New_York"
})

//start of the year Jan 1st 12am EST
cron.schedule('0 0 0 1 1 *', function(task) {
    console.log("now resetting yearly practicer timer");
    mongofuncs.resetServerTimePracticed("yearlyTotal");
}, {
    scheduled: true,
    timezone: "America/New_York"
})