## Coffee Shop Backend (Express)

### Setup

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```bash
copy .env.example .env
```

### Run

```bash
npm run dev
```

Server defaults to `http://localhost:8080`.

### Endpoints

- `GET /health`
- `GET /api/menu`
- `GET /api/services`
- `GET /api/orders` (in-memory)
- `POST /api/orders`

Example order payload:

```json
{
  "name": "NiwAn",
  "phone": "9999999999",
  "address": "Your address",
  "notes": "Less sugar",
  "items": [
    { "itemId": "espresso", "quantity": 1 },
    { "itemId": "cappuccino", "quantity": 2 }
  ]
}
```

