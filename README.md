
# m35-prisma — NestJS + Prisma + MySQL (Moduł 35.2)

Krótki projekt szkoleniowy: CRUD dla **products** i **orders** w NestJS z użyciem **Prisma** i **MySQL**.

## Wymagania

* Node.js 18+
* MySQL 8 (lokalnie)
* NPM

## Szybki start

1. `.env` i uzupełnij:

   ```env
   DATABASE_URL="mysql://root:HASLO@localhost:3306/shopdb"
   ```
2. Instalacja:

   ```bash
   npm i
   ```
3. Synchronizacja schematu z bazą:

   ```bash
   npx prisma db push
   ```
4. Dev-serwer:

   ```bash
   npm run dev
   ```

   Aplikacja: `http://localhost:3000`

> **Uwaga:** `Product.price` to **Int**. Dla 49,99 użyj 49 (lub w przyszłości zmień typ na Decimal).

## Endpoints

* **/products** – `POST`, `GET`, `GET/:id`, `PATCH/:id`, `DELETE/:id`
* **/orders** – `POST`, `GET`, `GET/:id`, `PATCH/:id`, `DELETE/:id`

### Przykładowe cURL

```bash
# Product – utwórz
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Klucz 17","price":49,"description":"CR-V"}'

# Product – lista
curl http://localhost:3000/products

# Product – szczegóły po ID
curl http://localhost:3000/products/<PRODUCT_ID>

# Product – aktualizacja
curl -X PATCH http://localhost:3000/products/<PRODUCT_ID> \
  -H "Content-Type: application/json" \
  -d '{"name":"Klucz 17 PRO","price":55}'

# Order – utwórz
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId":"<PRODUCT_ID>","client":"Jan Nowak","address":"Berlin, DE"}'

# Order – lista
curl http://localhost:3000/orders
```

## Struktura

```
src/
 ├─ products/ (dto, controller, service, module)
 ├─ orders/   (dto, controller, service, module)
 └─ shared/services/prisma.service.ts
prisma/
 └─ schema.prisma
```

## Konfiguracja TypeScript

W `tsconfig.json` wyłączone ostrzeżenia inicjalizacji pól w DTO:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictPropertyInitialization": false,
    "useDefineForClassFields": false
  }
}
```

## Skrypty NPM

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/main.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/main.js",
    "prisma:push": "prisma db push",
    "prisma:generate": "prisma generate"
  }
}
```



Chcesz gotowy plik?
**[Pobierz README.md](sandbox:/mnt/data/README-m35-prisma.md)**
