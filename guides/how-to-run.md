# How to Run

Prerequisites: Node.js 8.11 (LTS), Postgres 10, Redis 4

Only want to run the `republik-frontend` against the production API? [See it's readme](https://github.com/orbiting/republik-frontend) for an simple option.

### 1. Setup the Backends

```
git clone git@github.com:orbiting/backends.git
cd backends
yarn
cp .env.example .env
cp servers/republik/.env.example servers/republik/.env
cp servers/publikator/.env.example servers/publikator/.env
cp servers/assets/.env.example servers/assets/.env
```

#### Env Adaptation 

To run locally you will need a working `DATABASE_URL` and `REDIS_URL` in the root `.env` file. Usually you only need to change the username of the `DATABASE_URL`.

[See readme of `orbiting/backends`](https://github.com/orbiting/backends#envs) to go beyond.

#### Run 'Em

Use `yarn run dev` to run all servers in development.

Now you should be able to access following apps:

- [Republik API on 5000](http://localhost:5000/graphiql)
- [Publikator API on 5010](http://localhost:5010/graphiql)
- [Asset Server on 5020](http://localhost:5020/)

Note: The asset server greets you with `Cannot GET /` on the root route.

### 2. Setup the Frontends 

#### `republik-frontend`

The public website.

```
git clone git@github.com:orbiting/republik-frontend.git
cd republik-frontend
npm i
cp .env.example .env
npm run dev
```

#### `publikator-frontend`

The editor.

```
git clone git@github.com:orbiting/publikator-frontend.git
cd publikator-frontend
npm i
cp .env.example .env
npm run dev
```

#### `republik-admin-frontend`

The support interface.

```
git clone git@github.com:orbiting/republik-admin-frontend.git
cd republik-admin-frontend
npm i
cp .env.example .env
npm run dev
```

### 3. Setup the Styleguide

Only needed once you want to customize beyond what is possible with [theming](https://github.com/orbiting/styleguide#theming).

```
git clone git@github.com:orbiting/styleguide.git
cd styleguide
npm i
npm run dev
```

#### Linking

Want to test styleguide changes in the front ends?

```
cd styleguide
npm link
cd republik-frontend
npm run link:sg
cd publikator-frontend
npm run link:sg
```

Or test an backend email with a styleguide email template?

```
cd styleguide
yarn link
cd backends/packages/documents
yarn link @project-r/styleguide
```

## Deployment/Production Notes

All env variables need to go into the environment of the server, `.env` files are not used in production.

The three backend servers need to be run individually with a complete env for each (root `.env` and `servers/x/.env`).

You should use a CDN in front of the asset server. Otherwise assets tend to be really slow.

Make sure to test everything! Make sure to to adapt all UI texts and remove all Republik references.
