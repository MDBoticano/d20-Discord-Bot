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
    
    // Parse commands (uses prefix)
    if (command === 'd20') {
        // Initialize random number (ouput)
        var randomNum;
        var maxNum;
        var minNum;
        
        // Check number of arguments
        var argLength = args.length;
  
        // Validate Arguments
        for (var i = 0; i < argLength; i++){
            // If an argument is not a number or is negative, terminate the function
            if (isNaN(args[i]) || (parseInt(args[i]) <= 0)){
                return;
            }
            // If it is a number, make 
        }

        // If 0 arguments, do standard 1 - 20 roll
        if (argLength === 0) {
            randomNum = Math.floor(Math.random() * 20 + 1);
            console.log("Rolling from 1 to 20");
        } 
        // If 1 argument, roll from 1 to arg[0]; arg[0] is max
        else if (argLength === 1) {
            maxNum = parseInt(args[0]);
            
            console.log("Rolling from 1 to " + maxNum);
            randomNum = Math.floor(Math.random() * maxNum + 1);
        } 
        // If 2 arguments, roll from min (arg[0]) to max (arg[1])
        else if (argLength === 2) {
            minNum = parseInt(args[0]);
            maxNum = parseInt(args[1]);

            // If the smaller number is first, swap max and min
            if (minNum > maxNum) {
                maxNum = minNum + maxNum;
                minNum = maxNum - minNum;
                maxNum = maxNum - minNum;
            }

            console.log("Rolling from " + minNum + " to " + maxNum);
            randomNum = (Math.floor (Math.random() * (maxNum - minNum + 1))) + minNum;
        }

        // Send generated number to the channel command was used
        message.channel.send(randomNum);
    }
});

client.login(config.token);