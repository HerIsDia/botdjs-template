import {
  Client,
  Interaction,
  InteractionType,
} from 'discord.js';
import { commands } from '..';

module.exports = {
  name: 'interactionCreate',
  run: async (interaction: Interaction) => {
    const client = interaction.client as Client;
    if (!client.user) {
      throw new Error("Client user is null");
    }
    if (interaction.type === InteractionType.ApplicationCommand || interaction.type === InteractionType.ApplicationCommandAutocomplete) {
      commands[interaction.commandName](interaction);
    } else if (interaction.type === InteractionType.MessageComponent || interaction.type === InteractionType.ModalSubmit) {
      commands[interaction.customId](interaction);
    }
  }
}