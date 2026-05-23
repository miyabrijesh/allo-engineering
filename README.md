# Allo Engineering – Inventory Reservation System

A backend-first inventory reservation system built as part of the Allo Engineering take-home exercise.

This project models inventory availability across warehouses and exposes APIs to retrieve inventory information while preparing the foundation for reservation-based order fulfillment.

---

## Problem Statement

In e-commerce systems, stock cannot simply be deducted at checkout because payment flows may take time (UPI, redirects, 3DS authentication, etc.).

If inventory is reduced too late:
- Multiple users may purchase the same unit
- Refunds become necessary
- Customer experience degrades

If inventory is reduced too early:
- Inventory appears unavailable
- Cart abandonment causes artificial stock depletion

The intended solution is a **temporary reservation mechanism**:
- Reserve inventory for a short duration
- Confirm reservation after payment
- Release inventory automatically on expiry

---

## Current Implementation

Implemented:

- Product and warehouse inventory model
- PostgreSQL database using Supabase
- Prisma ORM integration
- Inventory querying API
- Product ↔ Warehouse relationship mapping
- Stock tracking (`total` vs `reserved`)
- Backend API foundation for reservation workflows

In Progress / Planned:

- Reservation creation endpoint
- Reservation confirmation flow
- Reservation release flow
- Expiry automation
- Frontend reservation experience
- Concurrency-safe reservation logic

---

## Tech Stack

| Layer | Technology |
|--------|-----------|
| Frontend | Next.js (App Router) |
| Backend | Next.js API Routes |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Language | TypeScript |

---

## Database Design

### Product

Represents sellable inventory.

Fields:
- id
- name

---

### Warehouse

Represents physical storage locations.

Fields:
- id
- name

---

### Inventory

Tracks inventory per warehouse.

Fields:

- id
- productId
- warehouseId
- total
- reserved

Available inventory is calculated as:

```text
available = total - reserved
```

---

### Reservation

Tracks temporary inventory holds.

Fields:

- id
- productId
- warehouseId
- quantity
- status
- expiresAt
- createdAt

Statuses:

```text
PENDING
CONFIRMED
RELEASED
```

---

## API

### GET /api/products

Returns inventory with related warehouse and product information.

Example response:

```json
[
  {
    "id": "inv001",
    "total": 10,
    "reserved": 0,
    "product": {
      "name": "iPhone 16"
    },
    "warehouse": {
      "name": "Warehouse A"
    }
  }
]
```

---

## Local Setup

Clone repository:

```bash
git clone https://github.com/miyabrijesh/allo-engineering.git
```

Enter project:

```bash
cd allo-engineering
```

Install dependencies:

```bash
npm install
```

Create environment file:

```env
DATABASE_URL=your_supabase_connection
DIRECT_URL=your_direct_connection
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

API endpoint:

```text
http://localhost:3000/api/products
```

---

## Example Seed Data

Warehouse:

```text
Warehouse A
```

Product:

```text
iPhone 16
```

Inventory:

```text
Total: 10
Reserved: 0
```

---

## Tradeoffs

For this implementation:

- Focused first on reliable data modeling
- Prioritized Prisma + PostgreSQL integration
- Deferred distributed locking and expiry workers

Production improvements:

- Redis locking
- Background expiry workers
- Reservation idempotency
- Reservation queue processing
- Monitoring and retry mechanisms

---

## Future Improvements

- Concurrency-safe reservation endpoint
- Reservation countdown UI
- Automatic release scheduling
- Warehouse prioritization
- Reservation analytics

---

## Author

Miya Brijesh

Built for Allo Engineering Take-Home Exercise.
