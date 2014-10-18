var tessel = require('tessel');

var climatelib = require('climate-si7020');
var twitter = require('twitter');
var util = require('util');

var setting = require('./settings');

var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);

function HygrothermographBot(){
  this.temperature = 0;
  this.humidity = 0;

  var climate = climatelib.use(tessel.port['A']);

  climate.on('ready', function () {
    console.log('Connected to si7020.');

    setInterval(function(){
      climate.emit('read_all');
    }, 1000);
  });

  climate.on('read_all', function(){
    climate.readHumidity(function(err, humid){
      climate.readTemperature(function(err, temp){
        this.temperature = temp;
        this.humidity = humid;
        var status = '温度:' +  this.temperature.toFixed(4) + 'C ';
        status += '湿度:' + this.humidity.toFixed(4) + '%';
        console.log(status);
      });
    });
    led1.toggle();
  });

  climate.on('error', function(err) {
    console.log('error connecting module', err);
  });
}

HygrothermographBot.prototype.tweet = function(){
  led2.toggle();
  var status = 'ただいまの気温は' + this.temperature.toFixed(4) + '度で、';
  status += '湿度は' + this.humidity.toFixed(4) + '%です。';
  console.log(status);
  twit = new twitter(setting.twitter_token);
  twit.updateStatus(status, function(data) {
    if (data.name === 'Error') {
      console.log('error sending tweet!', data.message);
    }
    else {
      console.log('tweet successful!');
    }
  });
  led2.toggle();
}


var bot = new HygrothermographBot();
setTimeout(bot.tweet, 10000);
setInterval(bot.tweet, 120000);
