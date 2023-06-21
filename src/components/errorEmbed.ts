import { EmbedBuilder } from "discord.js"

export const errorEmbed = (title: string, description: string) => {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(12883865)
    .setTimestamp(new Date());
}