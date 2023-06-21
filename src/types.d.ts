interface EventHandler {
  name: string;
  once?: boolean;
  run: (...args: any[]) => void | Promise<void>;
}

export interface CommandHandler {
  name: string;
  serversID?: string[]; // If you want to limit the command to specifics servers
  command: RESTPostAPIApplicationCommandsJSONBody;
  run: (interaction: Interaction) => void | Promise<void>;
}

export interface ComponentsHandler {
  ID: string;
  run: (interaction: Interaction) => void | Promise<void>;
}