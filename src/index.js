// Подключение переменных окружения
require('dotenv').config();

// Импорт необходимых классов и перечислений из v14
const { Client, GatewayIntentBits, Events } = require('discord.js');

// Инициализация клиента. 
// В v14 интенты обязательны и указываются через GatewayIntentBits
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent 
    ]
});

// Событие успешного запуска бота (заменяет старое 'ready')
client.once(Events.ClientReady, readyClient => {
    console.log(`Успех! Бот авторизован как ${readyClient.user.tag}`);
});

// Событие получения нового сообщения (заменяет 'message' из старых версий)
client.on(Events.MessageCreate, message => {
    // Игнорируем сообщения от других ботов
    if (message.author.bot) return;

    // Простая текстовая команда
    if (message.content.toLowerCase() === '!ping') {
        message.reply('Pong! Бот на базе Discord.js v14 работает.');
    }
});

// Авторизация бота с использованием токена
client.login('MTU1NDUwMjg2NDYzNjg3NDgxMg.GUJUZ6.-FS_RY-54MzU0TOLVk4yQFClUqAQxDiAwmveXA');
