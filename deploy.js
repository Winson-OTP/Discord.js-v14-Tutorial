const { token, id } = require('./setting.json')
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: '得知機器人的延遲資訊',
  },
  {
    name: 'bot-info',
    description: '查看機器人的相關資料及資訊',
  },
  {
    name: 'user-info',
    description: '查看指定使用者的資訊',
  },
  {
    name: 'server-info',
    description: '查看伺服器的資訊',
  }
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(id), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();