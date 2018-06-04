# Datavis 101

1. Basic charts are efficient
2. Be truthful: «The purpose of infographics and data visualizations is to enlighten people—not entertain them, not to sell them products, services, or ideas, but to inform them.» [_@albertocairo_](https://twitter.com/albertocairo)
3. Titel, labels and legend are key, annotate and explain

## Human Perception

- [Thinking with data visualizations, fast and slow](https://twitter.com/SteveFranconeri/status/996309494929018880) [_@SteveFranconeri_](https://twitter.com/SteveFranconeri)
- [Everything we know about how humans interpret graphics—37 studies on human perception in 30 minutes](https://www.youtube.com/watch?v=s0J6EDvlN30&list=PLlgxAbM67lYKz_NssZ1DdDwIRIWbkDlN-&index=13) [_@kennelliott_](https://twitter.com/kennelliott)

## Charts in our CMS

Currently we have bar and line charts, see [styleguide](https://styleguide.republik.ch/charts) for all options and examples.

### History

Originally developed for the government report [«Wellbeing in Germany»](https://www.gut-leben-in-deutschland.de/static/LB/indicators).

- maps and box plots have not been ported yet

### Data Formatting Rules

1. first line is header row with column keys
2. always have a value column with the number you want visualize
3. one row per value

General Advice: [Tidy Data Rulebook](https://wiederkehr.github.io/tidy-data-rulebook/) [_Benjamin Wiederkehr_](https://twitter.com/wiederkehr)

Transpose—aka rotating columns to rows—in your tabulator, is your friend.

### Publikator

#### Insert the Chart

`Editieren` -> `Einfügen` -> `Chart`

#### Edit a Chart

Double click or click the edit pen.

#### Fields

- `JSON Config`: use any props here, needs to be valid JSON, auto formats on blur if it is valid
- `CSV Data`: add your CSV data here, pasting TSV data is supported—you can copy and past from most tabulators like LibreOffice, Excel and Google Sheets.

#### Exports

Chrome only.

Export `SVG` for manual editing in e.g. Illustrator.

You can export an `Abstract Teaser` as `PNG` or `SVG`, use those pngs for the front.

Use `Abstract Teaser mit Hintergrund` as `PNG` for social media images.

## What to Read

- Book: the truthful art by alberto cairo
- Tweets, [a list of good accounts](https://twitter.com/tpreusse/lists/datavis/members)

## Xenographics are a Thing

- [Why we should all be little William Playfairs](http://slides.com/maartenzam/openvis-18) [_@maartenzam_](https://twitter.com/maartenzam)

[xeno.graphics](https://xeno.graphics/)
