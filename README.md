# mcp-remnawave 

[English](#english) | [Русский](#русский)

---

<a id="english"></a>

## MCP Server for Remnawave Panel

MCP server ([Model Context Protocol](https://modelcontextprotocol.io)) providing LLM clients (Claude Desktop, Cursor, Windsurf, etc.) with tools to manage a [Remnawave](https://github.com/remnawave/) VPN panel.

### Features

- **51 tools** — full management of users, nodes, hosts, subscriptions, squads, HWID devices, and system
- **3 resources** — real-time panel stats, node status, health checks
- **5 prompts** — guided workflows for common tasks
- **Type-safe** — built on [@remnawave/backend-contract](https://www.npmjs.com/package/@remnawave/backend-contract) for API route validation
- **stdio transport** — works with Claude Desktop, Cursor, Windsurf, and any MCP-compatible client

### Requirements

- Node.js >= 22
- Remnawave panel with API token (Settings > API Tokens)

### Installation

```bash
git clone https://github.com/TrackLine/mcp-remnawave.git
cd mcp-remnawave 
npm install
npm run build
```

### Configuration

Create a `.env` file or pass environment variables:

```env
REMNAWAVE_BASE_URL=https://vpn.example.com
REMNAWAVE_API_TOKEN=your-api-token-here
```

### Usage with Claude Desktop

Add to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "remnawave": {
      "command": "node",
      "args": ["/absolute/path/to/remnawave-mcp/dist/index.js"],
      "env": {
        "REMNAWAVE_BASE_URL": "https://vpn.example.com",
        "REMNAWAVE_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

### Usage with Cursor / Windsurf

Add to `.cursor/mcp.json` or `.windsurf/mcp.json` in your project:

```json
{
  "mcpServers": {
    "remnawave": {
      "command": "node",
      "args": ["/absolute/path/to/remnawave-mcp/dist/index.js"],
      "env": {
        "REMNAWAVE_BASE_URL": "https://vpn.example.com",
        "REMNAWAVE_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

### Docker

```bash
npm run build
docker compose up -d
```

Environment variables are passed via `.env` file or `docker-compose.yml`.

### Available Tools

#### Users (11 tools)

| Tool | Description |
|------|-------------|
| `users_list` | List all users with pagination |
| `users_get` | Get user by UUID |
| `users_get_by_username` | Get user by username |
| `users_get_by_short_uuid` | Get user by short UUID |
| `users_create` | Create a new user |
| `users_update` | Update user settings |
| `users_delete` | Delete a user |
| `users_enable` | Enable a disabled user |
| `users_disable` | Disable a user |
| `users_revoke_subscription` | Revoke subscription (regenerate link) |
| `users_reset_traffic` | Reset traffic counter |

#### Nodes (11 tools)

| Tool | Description |
|------|-------------|
| `nodes_list` | List all nodes |
| `nodes_get` | Get node by UUID |
| `nodes_create` | Create a new node |
| `nodes_update` | Update node settings |
| `nodes_delete` | Delete a node |
| `nodes_enable` | Enable a node |
| `nodes_disable` | Disable a node |
| `nodes_restart` | Restart a specific node |
| `nodes_restart_all` | Restart all nodes |
| `nodes_reset_traffic` | Reset node traffic counter |
| `nodes_reorder` | Reorder nodes |

#### Hosts (5 tools)

| Tool | Description |
|------|-------------|
| `hosts_list` | List all hosts |
| `hosts_get` | Get host by UUID |
| `hosts_create` | Create a new host |
| `hosts_update` | Update host settings |
| `hosts_delete` | Delete a host |

#### System (8 tools)

| Tool | Description |
|------|-------------|
| `system_stats` | Panel statistics (users, nodes, traffic, CPU, memory) |
| `system_bandwidth_stats` | Bandwidth statistics |
| `system_nodes_metrics` | Node metrics |
| `system_nodes_statistics` | Node statistics |
| `system_health` | Panel health check |
| `system_metadata` | Panel version and metadata |
| `system_generate_x25519` | Generate X25519 key pair |
| `auth_status` | Check authentication status |

#### Subscriptions (5 tools)

| Tool | Description |
|------|-------------|
| `subscriptions_list` | List all subscriptions |
| `subscriptions_get_by_uuid` | Get subscription by UUID |
| `subscriptions_get_by_username` | Get subscription by username |
| `subscriptions_get_by_short_uuid` | Get subscription by short UUID |
| `subscription_info` | Get subscription info |

#### Config Profiles & Inbounds (2 tools)

| Tool | Description |
|------|-------------|
| `config_profiles_list` | List config profiles |
| `inbounds_list` | List all inbounds |

#### Internal Squads (6 tools)

| Tool | Description |
|------|-------------|
| `squads_list` | List all squads |
| `squads_create` | Create a squad |
| `squads_update` | Update a squad |
| `squads_delete` | Delete a squad |
| `squads_add_users` | Add users to a squad |
| `squads_remove_users` | Remove users from a squad |

#### HWID Devices (3 tools)

| Tool | Description |
|------|-------------|
| `hwid_devices_list` | List user's HWID devices |
| `hwid_device_delete` | Delete a specific device |
| `hwid_devices_delete_all` | Delete all user's devices |

### Resources

| URI | Description |
|-----|-------------|
| `remnawave://stats` | Current panel statistics |
| `remnawave://nodes` | All nodes status |
| `remnawave://health` | Panel health status |
| `remnawave://users/{uuid}` | Specific user details |

### Prompts

| Prompt | Description |
|--------|-------------|
| `create_user_wizard` | Step-by-step user creation guide |
| `node_diagnostics` | Node troubleshooting |
| `traffic_report` | Traffic usage report |
| `user_audit` | Complete user audit |
| `bulk_user_cleanup` | Find and manage expired users |

### Example Queries

```
"Show me all users with expired subscriptions"
"Create user vasya with 50 GB limit for one month"
"Restart node amsterdam-01"
"Give me a traffic report for the last week"
"Disable users who exceeded their traffic limit"
"Which nodes are offline right now?"
```

### Project Structure

```
src/
├── index.ts              # Entry point (stdio transport)
├── server.ts             # McpServer setup
├── config.ts             # Environment config
├── client/
│   └── index.ts          # Remnawave HTTP client
├── tools/
│   ├── helpers.ts        # Result formatting helpers
│   ├── index.ts          # Tool registration
│   ├── users.ts          # User management
│   ├── nodes.ts          # Node management
│   ├── hosts.ts          # Host management
│   ├── system.ts         # System & auth
│   ├── subscriptions.ts  # Subscriptions
│   ├── inbounds.ts       # Config profiles & inbounds
│   ├── squads.ts         # Internal squads
│   └── hwid.ts           # HWID devices
├── resources/
│   └── index.ts          # MCP resources
└── prompts/
    └── index.ts          # MCP prompts
```

### License

MIT

---

<a id="русский"></a>

## MCP-сервер для Remnawave Panel

MCP-сервер ([Model Context Protocol](https://modelcontextprotocol.io)), предоставляющий LLM-клиентам (Claude Desktop, Cursor, Windsurf и др.) инструменты для управления VPN-панелью [Remnawave](https://github.com/remnawave/).

### Возможности

- **51 инструмент** — полное управление пользователями, нодами, хостами, подписками, группами, HWID-устройствами и системой
- **3 ресурса** — статистика панели, статус нод, проверка здоровья в реальном времени
- **5 промптов** — пошаговые сценарии для типичных задач
- **Type-safe** — построен на [@remnawave/backend-contract](https://www.npmjs.com/package/@remnawave/backend-contract) для валидации API-маршрутов
- **stdio транспорт** — работает с Claude Desktop, Cursor, Windsurf и любым MCP-совместимым клиентом

### Требования

- Node.js >= 22
- Remnawave панель с API-токеном (Настройки > API Tokens)

### Установка

```bash
git clone https://github.com/TrackLine/mcp-remnawave.git
cd mcp-remnawave 
npm install
npm run build
```

### Конфигурация

Создайте файл `.env` или передайте переменные окружения:

```env
REMNAWAVE_BASE_URL=https://vpn.example.com
REMNAWAVE_API_TOKEN=ваш-api-токен
```

### Использование с Claude Desktop

Добавьте в конфигурацию Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json` на macOS):

```json
{
  "mcpServers": {
    "remnawave": {
      "command": "node",
      "args": ["/абсолютный/путь/к/remnawave-mcp/dist/index.js"],
      "env": {
        "REMNAWAVE_BASE_URL": "https://vpn.example.com",
        "REMNAWAVE_API_TOKEN": "ваш-api-токен"
      }
    }
  }
}
```

### Использование с Cursor / Windsurf

Добавьте в `.cursor/mcp.json` или `.windsurf/mcp.json` вашего проекта:

```json
{
  "mcpServers": {
    "remnawave": {
      "command": "node",
      "args": ["/абсолютный/путь/к/remnawave-mcp/dist/index.js"],
      "env": {
        "REMNAWAVE_BASE_URL": "https://vpn.example.com",
        "REMNAWAVE_API_TOKEN": "ваш-api-токен"
      }
    }
  }
}
```

### Docker

```bash
npm run build
docker compose up -d
```

Переменные окружения передаются через `.env` файл или `docker-compose.yml`.

### Доступные инструменты

#### Пользователи (11 инструментов)

| Инструмент | Описание |
|------------|----------|
| `users_list` | Список пользователей с пагинацией |
| `users_get` | Получить пользователя по UUID |
| `users_get_by_username` | Получить пользователя по username |
| `users_get_by_short_uuid` | Получить пользователя по short UUID |
| `users_create` | Создать нового пользователя |
| `users_update` | Обновить настройки пользователя |
| `users_delete` | Удалить пользователя |
| `users_enable` | Включить пользователя |
| `users_disable` | Отключить пользователя |
| `users_revoke_subscription` | Отозвать подписку (перегенерировать ссылку) |
| `users_reset_traffic` | Сбросить счётчик трафика |

#### Ноды (11 инструментов)

| Инструмент | Описание |
|------------|----------|
| `nodes_list` | Список всех нод |
| `nodes_get` | Получить ноду по UUID |
| `nodes_create` | Создать новую ноду |
| `nodes_update` | Обновить настройки ноды |
| `nodes_delete` | Удалить ноду |
| `nodes_enable` | Включить ноду |
| `nodes_disable` | Отключить ноду |
| `nodes_restart` | Перезапустить ноду |
| `nodes_restart_all` | Перезапустить все ноды |
| `nodes_reset_traffic` | Сбросить трафик ноды |
| `nodes_reorder` | Переупорядочить ноды |

#### Хосты (5 инструментов)

| Инструмент | Описание |
|------------|----------|
| `hosts_list` | Список всех хостов |
| `hosts_get` | Получить хост по UUID |
| `hosts_create` | Создать новый хост |
| `hosts_update` | Обновить настройки хоста |
| `hosts_delete` | Удалить хост |

#### Система (8 инструментов)

| Инструмент | Описание |
|------------|----------|
| `system_stats` | Статистика панели (пользователи, ноды, трафик, CPU, память) |
| `system_bandwidth_stats` | Статистика пропускной способности |
| `system_nodes_metrics` | Метрики нод |
| `system_nodes_statistics` | Статистика нод |
| `system_health` | Проверка здоровья панели |
| `system_metadata` | Версия и метаданные панели |
| `system_generate_x25519` | Генерация пары ключей X25519 |
| `auth_status` | Проверка статуса аутентификации |

#### Подписки (5 инструментов)

| Инструмент | Описание |
|------------|----------|
| `subscriptions_list` | Список всех подписок |
| `subscriptions_get_by_uuid` | Подписка по UUID |
| `subscriptions_get_by_username` | Подписка по username |
| `subscriptions_get_by_short_uuid` | Подписка по short UUID |
| `subscription_info` | Информация о подписке |

#### Конфиг-профили и Inbounds (2 инструмента)

| Инструмент | Описание |
|------------|----------|
| `config_profiles_list` | Список конфиг-профилей |
| `inbounds_list` | Список всех inbounds |

#### Внутренние группы (6 инструментов)

| Инструмент | Описание |
|------------|----------|
| `squads_list` | Список групп |
| `squads_create` | Создать группу |
| `squads_update` | Обновить группу |
| `squads_delete` | Удалить группу |
| `squads_add_users` | Добавить пользователей в группу |
| `squads_remove_users` | Убрать пользователей из группы |

#### HWID-устройства (3 инструмента)

| Инструмент | Описание |
|------------|----------|
| `hwid_devices_list` | Список устройств пользователя |
| `hwid_device_delete` | Удалить конкретное устройство |
| `hwid_devices_delete_all` | Удалить все устройства пользователя |

### Ресурсы

| URI | Описание |
|-----|----------|
| `remnawave://stats` | Текущая статистика панели |
| `remnawave://nodes` | Статус всех нод |
| `remnawave://health` | Состояние здоровья панели |
| `remnawave://users/{uuid}` | Данные конкретного пользователя |

### Промпты

| Промпт | Описание |
|--------|----------|
| `create_user_wizard` | Пошаговое создание пользователя |
| `node_diagnostics` | Диагностика ноды |
| `traffic_report` | Отчёт по трафику |
| `user_audit` | Полный аудит пользователя |
| `bulk_user_cleanup` | Поиск и управление просроченными пользователями |

### Примеры запросов

```
«Покажи мне всех пользователей с истёкшей подпиской»
«Создай пользователя vasya с лимитом 50 ГБ на месяц»
«Перезапусти ноду amsterdam-01»
«Дай отчёт по трафику за последнюю неделю»
«Отключи пользователей, которые превысили лимит трафика»
«Какие ноды сейчас офлайн?»
```

### Структура проекта

```
src/
├── index.ts              # Точка входа (stdio транспорт)
├── server.ts             # Настройка McpServer
├── config.ts             # Конфигурация окружения
├── client/
│   └── index.ts          # HTTP-клиент Remnawave
├── tools/
│   ├── helpers.ts        # Хелперы форматирования
│   ├── index.ts          # Регистрация инструментов
│   ├── users.ts          # Управление пользователями
│   ├── nodes.ts          # Управление нодами
│   ├── hosts.ts          # Управление хостами
│   ├── system.ts         # Система и авторизация
│   ├── subscriptions.ts  # Подписки
│   ├── inbounds.ts       # Конфиг-профили и inbounds
│   ├── squads.ts         # Внутренние группы
│   └── hwid.ts           # HWID-устройства
├── resources/
│   └── index.ts          # MCP-ресурсы
└── prompts/
    └── index.ts          # MCP-промпты
```

### Лицензия

MIT
