const wa = require('@open-wa/wa-automate');
const request = require("request");

//SESSION
wa.create({
	sessionId: 'Minelux',
	headless: true,
	qrTimeout: 0,
	authTimeout: 0,
	restartOnCrash: start,
	cacheEnabled: false,
	useChrome: true,
	killProcessOnBrowserClose: true,
	throwErrorOnTosBlock: false,
	chromiumArgs: [
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--aggressive-cache-discard',
		'--disable-cache',
		'--disable-application-cache',
		'--disable-offline-load-stale-cache',
		'--disk-cache-size=0'
	]
}).then(client => start(client));

//CODE

var url = "https://api.mcsrvstat.us/bedrock/2/play.mineluxmc.com";
var options = {json: true};

function info(client) {
	request(url, options, (error, response, body) => {
		var player_online = body.players.online;
		var max_players = body.players.max;
		var version = body.version;
		var ip = body.hostname;
		var port = body.port;
		if(body.online == true) {
			var online = "ONLINE";
		};
		if(body.online == false) {
			var online = "OFFLINE";
		};
		client.sendText(message.from, `*SERVER STATUS*\n\n*IP:* ${ip}\n*PORT:* ${port}\n*STATUS:* ${online}\n\n*ONLINE PLAYERS:*\n${player_online}/${max_players}\n*VERSION:* ${version}`);
	});
};

function start(client) {
  client.onMessage(async message => {
    if (message.body === 'Hi') {
		function info() {
			request(url, options, (error, response, body) => {
				var player_online = body.players.online;
				var max_players = body.players.max;
				var version = body.version;
				var ip = body.hostname;
				var port = body.port;
				if(body.online == true) {
					var online = "ONLINE";
				};
				if(body.online == false) {
					var online = "OFFLINE";
				};
				client.sendText(message.from, `*SERVER STATUS*\n\n*IP:* ${ip}\n*PORT:* ${port}\n*STATUS:* ${online}\n\n*ONLINE PLAYERS:* ${player_online}/${max_players}\n*VERSION:* ${version}`);
			});
		};
		info()
    	//await client.sendText(message.from, `*SERVER STATUS*\n\n*IP:* ${ip}\n*PORT:* ${port}\n*STATUS:* ${online}\n\n*ONLINE PLAYERS:*\n${player_online}/${max_players}\n*VERSION:* ${version}`);
    }
  });
}



