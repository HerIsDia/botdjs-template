import { Client } from 'discord.js';
import { EventHandler } from '../types';
require('dotenv').config();

const event: EventHandler = {
  name: 'ready',
  once: true,
  run: (client: Client) => {
    if (!client.user) {
      throw new Error("Client user is null");
    }
    console.log(`Logged in as ${client.user.tag}!`);
  },
};

module.exports = event;