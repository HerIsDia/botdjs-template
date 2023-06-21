import { Client, GatewayIntentBits, Interaction, REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { CommandHandler, ComponentsHandler, EventHandler } from "./types";
require("dotenv").config();

// Declare the client.
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Creates client's variables and check if they are not undefined
const clientToken = process.env.CLIENT_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!clientToken || !clientId) {
  throw new Error("Client token or client id is undefined");
}

// Read the current directory
const currentDirectory = readdirSync(path.join(__dirname, "."));



// Declare the event handler.
if (currentDirectory.includes("events")) {
  const eventFiles = readdirSync(path.join(__dirname, ".", "events")).filter((file) =>
    file.endsWith('.ts') || file.endsWith('.js')
  );

  for (const file of eventFiles) {
    const event = require(`./events/${file}`) as EventHandler;
    const { name, once, run } = event;
    if (once) {
      client.once(name, run);
    } else {
      client.on(name, run);
    }
  }

}

//Registers commands functions
type CommandsFunctions = {
  [id: string]: (interaction: Interaction) => void | Promise<void>;
}
export let commands: CommandsFunctions = {};

// Declare the commands handler.
if (currentDirectory.includes("commands")) {

  const rest = new REST({ version: '10' }).setToken(clientToken);
  const commandsFiles = readdirSync(path.join(__dirname, ".", "commands")).filter((file) =>
    file.endsWith('.ts') || file.endsWith('.js')
  );

  let globalCommands = [];

  type ServerCommands = {
    [key: string]: RESTPostAPIApplicationCommandsJSONBody[];
  }
  let serverCommands: ServerCommands = {};

  for (const file in commandsFiles) {
    const commandFile = require(`./commands/${commandsFiles[file]}`) as CommandHandler;
    const { serversID, command, name, run } = commandFile;
    commands[name] = run;
    if (!serversID) {
      globalCommands.push(command);
    } else {
      for (const serverID in serversID) {
        if (!serverCommands[serversID[serverID]]) {
          serverCommands[serversID[serverID]] = [];
        }
        serverCommands[serversID[serverID]].push(command);
      }
    }
  }

  // Register commands
  (async () => {
    try {
      console.log(`Started refreshing ${globalCommands.length} global application (/) commands.`);
      await rest.put(
        Routes.applicationCommands(clientId),
        { body: globalCommands },
      );
      console.log(`Successfully reloaded ${globalCommands.length} global application (/) commands.`);

      for (const serverID in serverCommands) {
        console.log(`Started refreshing ${serverCommands[serverID].length} application (/) commands for server ${serverID}.`);
        await rest.put(
          Routes.applicationGuildCommands(clientId, serverID),
          { body: serverCommands[serverID] },
        );
        console.log(`Successfully reloaded ${serverCommands[serverID].length} application (/) commands for server ${serverID}.`);
      }
    } catch (error) {
      console.error(error);
    }
  })();
};

// Components handler.
if (currentDirectory.includes("components")) {
  const componentsFiles = readdirSync(path.join(__dirname, ".", "components")).filter((file) =>
    file.endsWith('.ts') || file.endsWith('.js')
  );

  for (const file in componentsFiles) {
    const componentFile = require(`./components/${componentsFiles[file]}`) as ComponentsHandler;
    const { ID, run } = componentFile;
    commands[ID] = run;
  }
}

// Login to Discord with your client's token
client.login(clientToken);