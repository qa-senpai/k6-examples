# K6 Practice - Тестування навантаження

Цей репозиторій містить приклади та практичні завдання для роботи з [k6](https://k6.io/) - сучасним інструментом тестування навантаження з відкритим вихідним кодом.

## 📋 Зміст

- [Встановлення](#встановлення)
- [Структура проекту](#структура-проекту)
- [Запуск тестів](#запуск-тестів)
- [Типи тестів](#типи-тестів)
- [Контролери](#контролери)
- [Приклади використання](#приклади-використання)
- [K6 Cloud](#k6-cloud)

## 🚀 Встановлення

### 1. Встановлення k6

**macOS (Homebrew):**

```bash
brew install k6
```

**Ubuntu/Debian:**

```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Windows (Chocolatey):**

```bash
choco install k6
```

### 2. Встановлення залежностей проекту

```bash
npm install
```

## 📁 Структура проекту

```
k6-practice/
├── controllers/          # Класи для організації HTTP запитів
│   ├── Pizza.ts          # Контролер для роботи з API піци
│   └── Users.ts          # Контролер для аутентифікації
├── tests/                # Тестові сценарії
│   ├── pizza-obj.ts      # Базовий тест з OOP підходом
│   ├── pizza-avg-laod.ts # Тест середнього навантаження
│   ├── pizza-spike-laod.ts # Тест пікового навантаження
│   ├── pizza-receipt.ts  # Простий тест отримання чеку
│   ├── advanced-tagged-scenario.ts # Розширений тест з тегами
│   ├── complex-scenario.ts # Складний сценарій
│   └── condulit/         # Тести для Conduit API
│       └── create-article.ts # CRUD операції з статтями
├── package.json
└── README.md
```

## 🏃 Запуск тестів

### Локальне виконання

```bash
# Основний тест з використанням класів
k6 run tests/pizza-obj.ts

# Тест середнього навантаження
k6 run tests/pizza-avg-laod.ts

# Тест пікового навантаження
k6 run tests/pizza-spike-laod.ts

# CRUD тест для Conduit API
k6 run tests/condulit/create-article.ts
```

### Запуск з параметрами

```bash
# Запуск з кастомним навантаженням
k6 run --vus 10 --duration 30s tests/pizza-obj.ts

# Запуск з профілем навантаження
k6 run --stage 5s:10,10s:20,5s:0 tests/pizza-obj.ts
```

## 🧪 Типи тестів

### 1. **Smoke Test** (Димовий тест)

Мінімальне навантаження для перевірки базової функціональності:

- VUs: 1-2
- Duration: 30s-2m

### 2. **Load Test** (Тест навантаження)

Звичайне навантаження для оцінки продуктивності:

- VUs: 10-100
- Duration: 5-60m

### 3. **Spike Test** (Тест пікового навантаження)

Різке збільшення навантаження:

- Поступове збільшення до максимуму
- Швидке зменшення

### 4. **Stress Test** (Стрес-тест)

Поступове збільшення навантаження до межі:

- Знаходження точки відмови системи

## 🎮 Контролери

### Users.ts

Відповідає за аутентифікацію користувачів:

- `getToken()` - отримання JWT токена для авторизації

### Pizza.ts

Управління операціями з піцами:

- `createPizzaReceipt(token)` - створення замовлення піци

### Приклад використання:

```typescript
import { Users } from "../controllers/Users.ts";
import { Pizza } from "../controllers/Pizza.ts";

const users = new Users();
const pizza = new Pizza();

const token = users.getToken();
const response = pizza.createPizzaReceipt(token);
```

## 💡 Приклади використання

### Базовий тест з перевірками

```typescript
import { check } from "k6";
import { Options } from "k6/options";

export const options: Options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const response = http.get("https://httpbin.test.k6.io/");

  check(response, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });
}
```

### Тест з етапами навантаження

```typescript
export const options: Options = {
  stages: [
    { duration: "2m", target: 10 }, // warm up
    { duration: "5m", target: 10 }, // stable load
    { duration: "2m", target: 20 }, // ramp up
    { duration: "5m", target: 20 }, // stable high load
    { duration: "2m", target: 0 }, // ramp down
  ],
};
```

## ☁️ K6 Cloud

Проект налаштовано для роботи з K6 Cloud для розширеного моніторингу та аналітики.

### Запуск в Cloud

```bash
# Аутентифікація (потрібен API токен)
k6 login cloud

# Запуск тесту в хмарі
k6 cloud tests/pizza-avg-laod.ts
```

### Налаштування Cloud

```typescript
export const options: Options = {
  cloud: {
    projectID: 4087876, // ID вашого проекту
    name: "Pizza Load Test",
    distribution: {
      "amazon:de:frankfurt": {
        loadZone: "amazon:de:frankfurt",
        percent: 100,
      },
    },
  },
};
```

## 🔧 Корисні команди

```bash
# Перевірка версії k6
k6 version

# Валідація тестового скрипта
k6 validate tests/pizza-obj.ts

# Запуск з виводом результатів у JSON
k6 run --out json=results.json tests/pizza-obj.ts

# Запуск з тихим режимом
k6 run --quiet tests/pizza-obj.ts
```

## 📊 Метрики та аналіз

K6 автоматично збирає наступні метрики:

- **http_req_duration** - час відповіді HTTP запитів
- **http_req_failed** - відсоток неуспішних запитів
- **http_reqs** - загальна кількість HTTP запитів
- **vus** - кількість активних віртуальних користувачів
- **iterations** - кількість завершених ітерацій

## 📚 Додаткові ресурси

- [Документація K6](https://k6.io/docs/)
- [K6 API Reference](https://k6.io/docs/javascript-api/)
- [Приклади тестів](https://github.com/grafana/k6/tree/master/examples)
- [K6 Cloud](https://app.k6.io/)
