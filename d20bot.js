const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log("Ready!");
});

// Sets a prefix (!); can be done via config 
const prefix = "!";

// Checks messages
client.on("message", (message) => {
    // Terminates message check if no prefix or message was written by a bot
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }        

    // Splits a command message into arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift(); // can append .toLowerCase() so command case doesn't matter (e.g. !ping and !Ping are the same)
    
    // Conditionals
    if (command === 'd20') {
        // Initialize random number
        var randomNum;
        
        // check number of arguments
        var argLength = args.length;
  
        // Validate arguments are numbers? Struggling here
        // for (var i = 0; i < argLength; i++){
        //     console.log("Checking arguments");
        //     if (Number.isNaN(args[i])) {
        //         console.log("Not a number!");
        //         //return;
        //     }
        // }

        // If 0 arguments, do standard 1 - 20 roll
        if (argLength === 0) {
            randomNum = Math.floor(Math.random() * 20 + 1);
        } 
        // If 1 argument, roll from 1 to arg[0]; arg[0] is max
        else if (argLength === 1) {
            randomNum = Math.floor(Math.random() * args[0] + 1);
        } 
        // If 2 arguments, roll from min (arg[0]) to max (arg[1])
        else if (argLength === 2) {
            // Need to convert args[0] into a number so it doesn't append as a string; maybe fix earlier
            randomNum = (Math.floor (Math.random() * (args[1] - args[0] + 1))) + Number(args[0]);
        }

        // Send generated number
        message.channel.send(randomNum);
    }
});

client.login(config.token);