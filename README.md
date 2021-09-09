# Vending Machine

Project demonstrates working of a simple vending machine.

## Structure

This is a monorepo containing both frontend and backend code. Both packages are located in the `/packages` folder

### Frontend

Using [React](https://reactjs.org/) and created with `create-react-app`. Tailwind added as a CSS library.

### Backend

Using [NestJS](https://nestjs.com/) and scaffolded with NestJS CLI.

Database used is SQLite and ORM is Prisma.

## Development

After cloning repo, do:

```bash
npm install
```

This will run postinstall script and install dependencies in both packages.
It's important to set `.env` file at the `packages/backend` folder (there is `.env.example` for reference).

### Seeding

To seed the database run

```bash
cd packages/backend
npm run prisma:seed
```

Seeding adds users `test1` and `test2` (sellers), `test3` and `test4` (buyers). ALl of them have `123456` as password.

### Start

Start backend and frontend dev servers with

```bash
npm run dev:frontend
npm run dev:backend
```

### VS Code

If you use VS Code as IDE there are tasks and extension set up for better dev flow.

## Testing

```bash
cd packages/backend
npm run test
npm run test:e2e
```

> 💡 It's important to seed database before running e2e tests (to make sure DB has sufficient product amounts and users).
