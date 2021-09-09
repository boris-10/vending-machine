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

### Seeding

To seed the database run

```bash
cd packages/backend
npm run prisma:seed
```

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