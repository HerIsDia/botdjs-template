import { Interaction, InteractionType, SlashCommandBuilder } from 'discord.js';
import { CommandHandler } from '../types';

const name = 'ping';

const command = new SlashCommandBuilder()
  .setName(name)
  .setDescription('Ping the bot !');

const run = async (interaction: Interaction) => {
  if (interaction.type != InteractionType.ApplicationCommand) return;
  await interaction.deferReply({ ephemeral: true });
  const reply = await interaction.editReply({
    content: `Pong !`,
  });
  const msInterval = reply.createdTimestamp - interaction.createdTimestamp;
  await interaction.editReply({
    content: `Pong ! \`(${msInterval}ms)\``,
  });
};

module.exports = {
  name: name,
  command: command.toJSON(),
  run,
} as CommandHandler;