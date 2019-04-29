# How to Run

Previous: [Overview](./overview.md)

Note: Only want to run the `republik-frontend` against the production API? [See its readme](https://github.com/orbiting/republik-frontend) for an simple option.

## Prerequisites

See [backends/package.json#engines](https://github.com/orbiting/backends/blob/master/package.json) for currently used Node.js and yarn versions.

- Postgres 10
- Redis 4
- Elasticsearch 6
- Node.js (LTS)
- yarn

On macOS with [homebrew](https://brew.sh/):
```
brew install postgresql redis nvm elasticsearch
nvm install 10
nvm alias default 10
npm install -g yarn@1.15
brew services start postgresql
brew services start redis
brew services start elasticsearch
```

## Clone & Setup

The setup: Get it all running locally—from backends, to frontends and the styleguide.

You can skip certain frontends and the styleguide if, for example, you only want a running CMS.

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

#### Minimal Env 

To run locally you will need a working `DATABASE_URL` and `REDIS_URL` in the root `.env` file. The defaults may just work for you.

##### Next Env Steps

You don't need to do those immediately. But you will quickly run into errors and limitations if those envs are not present. You probably want to do the following three rather soon:

1. [Setup GitHub](https://github.com/orbiting/backends/tree/master/servers/publikator#github) 
    - `GITHUB_*` in the root `.env`
2. MailChimp and Mandrill
    - `MAILCHIMP_URL`, `MAILCHIMP_API_KEY`, `MANDRILL_API_KEY` in the root `.env`
    - `MAILCHIMP_*` in `servers/republik/.env` (less important)
3. S3 Bucket
    - `AWS_*` in the root `.env`

For further advice consult the [readme of `orbiting/backends`](https://github.com/orbiting/backends#envs).

#### Seed the Database

```
cd servers/republik
createdb republik
yarn run db:migrate:up
node seeds/seedCrowdfundings.js
```

#### Run 'Em

Use `yarn run dev` in the `backends` folder to run all servers in development.

Now you should be able to access following apps:

- [Republik API on 5000](http://localhost:5000/graphiql)
- [Publikator API on 5010](http://localhost:5010/graphiql)
- [Asset Server on 5020](http://localhost:5020/)

Note: All servers greets you with `Cannot GET /` on the root route. The API servers have a graphical API explorer available at `/graphiql`.

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

Create your user:
- open http://localhost:3010/konto
- enter your email
- extract the `LOGIN_LINK` from the backend log and open it

#### `publikator-frontend`

The editor.

```
git clone git@github.com:orbiting/publikator-frontend.git
cd publikator-frontend
npm i
cp .env.example .env
npm run dev
```

Give yourself premission to access:

```
cd backends
yarn run roleUser editor you@example.com
```

Note: Make sure to use your email address.

You will need the `GITHUB_*` envs in the backends and the `GITHUB_ORG` env in this frontend ready to truely use publikator.

#### `republik-admin-frontend`

The support interface.

```
git clone git@github.com:orbiting/republik-admin-frontend.git
cd republik-admin-frontend
npm i
cp .env.example .env
npm run dev
```

Give yourself premission to access:

```
cd backends
yarn run roleUser supporter you@example.com
yarn run roleUser admin you@example.com
yarn run roleUser accountant you@example.com
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
