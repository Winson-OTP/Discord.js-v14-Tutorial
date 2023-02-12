const { token, id } = require('./setting.json')
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  client.user.setPresence({ activities: [{ name: 'iTHome' }], status: 'idle' });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    const msg = await interaction.reply({
      content: "正在計算延遲......",
      fetchReply: true
    });
    
    const ping = msg.createdTimestamp - interaction.createdTimestamp;
      
    interaction.editReply(`機器人延遲：${ping} ms\nＡＰＩ延遲：${client.ws.ping} ms`) 
  }

  if (interaction.commandName === 'bot-info') {
    interaction.reply(
      `機器人名稱：${client.user.username}\n`+
      `機器人ＩＤ：${client.user.id}\n`+
      `機器人製作者：自行填寫\n`+
      `機器人建立時間：<t:${~~(client.user.createdTimestamp/1000)}:R>\n`+
      `機器人邀請連結：自行填寫\n`+
      `機器人版本：自行填寫\n`+
      `機器人所在伺服器數量：${client.guilds.cache.size}\n`+
      `機器人上線時間：${msToHMS(client.uptime)}`
    )
  }

  if (interaction.commandName === 'user-info') {
    interaction.reply(
      `使用者名稱：${interaction.user.username}\n`+
      `使用者ＩＤ：${interaction.user.id}\n`+
      `使用者創建時間：<t:${~~(interaction.user.createdTimestamp/1000)}:R>\n`+
      `是否為機器人：${interaction.user.bot? '是':'否'}\n`
    )
  }

  if (interaction.commandName === 'server-info') {
    interaction.reply(
      `伺服器名稱：${interaction.guild.name}\n` +
      `伺服器ＩＤ：${interaction.guild.id}\n` +
      `伺服器創建時間：<t:${~~(interaction.guild.createdTimestamp/1000)}:R>\n` +
      `伺服器簡介：${interaction.guild.description ?? "無"}\n` + 
      `伺服器擁有者：<@${interaction.guild.ownerId}>\n` +
      `伺服器人數：${interaction.guild.memberCount}\n`
    )
  }
});

client.login('MTA2ODkyMTMwMjgwODgwMTM0MQ.G8zb_D.kEng-uq4jKAaIPhcLXQHlG8wPnIHuY-WazisJg');

function msToHMS(ms) {
  let seconds = ms / 1000; //將毫秒轉換為秒
  const hours = parseInt( seconds / 3600 ); //將可以轉為小時的秒轉換為小時
  seconds = seconds % 3600; //去除已轉換為小時的秒
  const minutes = parseInt( seconds / 60 ); //將可以轉為分鐘的秒轉換為分鐘
  seconds = seconds % 60; //去除已轉換為分鐘的秒
  return(`${hours}:${minutes}:${~~(seconds)}`); //回傳轉換後的結果
}