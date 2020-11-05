# Urabstimmung

## Backend

To create an urabstimmung, adapt (name, slug, beginDate, etc) and execute the following query on [api.republik.ch](https://api.republik.ch/graphiql)

```
mutation {
  createVoting(votingInput: {
    name: "gen20discharge"
    slug: "gen20discharge"
    description: "Wollen Sie dem Vorstand für das Geschäftsjahr 2019/2020 die Entlastung erteilen?"
    beginDate: "2020-08-01"
    endDate: "2020-12-12"
    allowEmptyBallots: true
    allowedMemberships: [
      {membershipTypeId: "8ecd1d10-1519-4382-a401-5ec10bbec181" createdBefore: "2020-08-01"}
      {membershipTypeId: "ef0f787a-34b5-4494-80f6-18831799aaaa" createdBefore: "2020-08-01"}
    ]
    allowedRoles: ["associate"]
    groupSlug: "gen202012"
    options: [
      {name: "YES" label: "YES" description: "YES"}
      {name: "NO" label: "NO" description: "NO"}
    ]
  }) {
    id
    slug
    description
    beginDate
    endDate
    options {id name label description}
    userIsEligible
    userHasSubmitted
    userSubmitDate
    allowedMemberships{membershipTypeId createdBefore}
    allowedRoles
    groupSlug
    name
    discussion {id title}
    turnout{eligible submitted}
    groupTurnout{eligible submitted}
    liveResult
    result {options{option{name} count winner}}
  }
}
```
2019 the following votings where created: `gen1920revision, gen19discharge, gen1819accounts, gen1819report` (all with the same `groupSlug = gen201912`).

## Caveat

`allowedMemberships` defines which membership types are allowed to submit ballots, depending on their `createdAt` date. Some memberships are created before activation, and can be activted during a voting period, `Voting.turnout.eligible` count is prone to be instable.

Using *dedicated user role* can stabilize that eligible count.

1.  Settle on a role name but best practice is to use votings `groupSlug` e.g. `gen202011`.

2.  Determine wich users are eligable, and append role via SQL.

    A common example: User requires a membership of types ABO or BENEFACTOR ABO which began before Nov 6 and ends after Nov 6.

    SQL Statement:

    ```
    BEGIN;

    -- List of user IDs and their minimum and maximum membership periods (first day, last day)
    -- limited to membership typs ABO, BENEFACTOR_ABO
    WITH "minMaxDates" AS (
      SELECT m."userId", MIN(mp."beginDate") "minBeginDate", MAX(mp."endDate") "maxEndDate"
      FROM "memberships" m
      JOIN "membershipPeriods" mp
        ON mp."membershipId" = m.id
      JOIN "membershipTypes" mt
        ON mt.id = m."membershipTypeId"
        AND mt.name IN ('ABO', 'BENEFACTOR_ABO')
      WHERE m."userId" != 'f0512927-7e03-4ecc-b14f-601386a2a249' -- Jefferson
      GROUP BY 1
    )

    -- Update users
    UPDATE users
    SET roles = roles || '["gen202011"]'
    WHERE
      NOT roles @> '"gen202011"'
      AND id IN (
        -- Filter list of user IDs which match requirements
        SELECT "userId"
        FROM "minMaxDates"
        WHERE "minBeginDate" < '2020-11-06' AND "maxEndDate" >= '2020-11-06'
      );

    COMMIT;
    ```

3.  Remove `allowedMemberships` in mutation `createVoting` and set role name in `allowedRoles` argument in GraqhQL query:

    ```
    mutation {
      createVoting(votingInput: {
        ...
        allowedRoles: ["gen202011"]
        ...
      }) {
        ...
    ```
