# Discord.js Bot Template

This is a template for creating a Discord.js bot in TypeScript.

## Getting Started

To create a new bot project based on this template, you can either:

- [Use this template on GitHub](https://github.com/herisdia/botdjs-template/generate)
- Clone this repository and remove the `.git` directory:

  ```sh
  git clone https://github.com/herisdia/botdjs-template.git my-bot
  cd my-bot
  rm -rf .git
  ```

- Once you have a copy of the template, you can install the dependencies and start the bot in development mode:

  ```sh
  npm install
  npm run dev
  ```

  or

  ```sh
  yarn
  yarn dev
  ```

  or

  ```sh
  pnpm install
  pnpm run dev
  ```

This will start the bot with nodemon and automatically restart it when you make changes to the code.

## Configuration

Copy the `.env.example` file to `.env` and fill out the values:

```sh
cp .env.example .env
```

Before you can start the bot, you need to create a .env file with your bot token:

```.env
CLIENT_TOKEN=your-token-here
CLIENT_ID=your-client-id-here
```

## Contributing

If you have any suggestions or find a bug, please [open an issue](https://github.com/herisdia/botdjs-template/issues/new) or a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
