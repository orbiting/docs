# How to Run

Previous: [Overview](./overview.md)

Note: Only want to run the `republik-frontend` against the production API? [See its readme](https://github.com/orbiting/republik-frontend) for an simple option.

## Prerequisites

See [backends/package.json#engines](https://github.com/orbiting/backends/blob/master/package.json) for currently used Node.js and yarn versions.

## Clone & Setup

The setup: Get it all running locally—from backends, to frontends and the styleguide.

You can skip certain frontends and the styleguide if, for example, you only want a running CMS.

### 1. Setup the Backends

See the [how to run](https://github.com/orbiting/backends#how-to-run--development) readme section of the backends repo.

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
