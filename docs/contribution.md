# Fix: Handle undefined token error during initialization

## 🐛 Описание проблемы
При запуске бота (`node index.js`) происходила фатальная ошибка: `An invalid token was provided`. Переменные окружения подхватывались (`injected env (0) from .env`), однако сам токен не передавался в процесс инициализации. В результате статус определялся как `ТОКЕН НЕ НАЙДЕН (undefined)`, что приводило к сбою при попытке входа (login).

## 🛠 Внесенные изменения
Добавлена явная проверка наличия токена после загрузки конфигурации и безопасная обработка процесса авторизации.

### Было (Уязвимый код):
```javascript
require('dotenv').config();
// Скрипт запущен
const client = new BotClient();

// Скрипт падал с "An invalid token was provided", если токен не был найден в окружении
client.login(process.env.TOKEN);
```
### Стало (Исправленный код):
```javascript
require('dotenv').config();
// Скрипт запущен
const client = new BotClient();

const token = process.env.TOKEN || process.env.GITHUB_TOKEN;

if (!token) {
  console.error("--> Статус токена: ТОКЕН НЕ НАЙДЕН (undefined)");
  process.exit(1);
}

client.login(token).catch(err => {
  console.error("--> Ошибка node index.js при попытке входа: An invalid token was provided.");
});
```
