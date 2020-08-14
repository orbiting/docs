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
    allowedRoles
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
