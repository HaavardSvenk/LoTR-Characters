# Praksis oppgave hos WA.works

- Min første React-app.

## Oppgavebeskrivelse:

1. Lage en webside som viser en tabell av informasjon fra et API online. Står fritt til å velge API selv
   og det skal være 5-8 valgfrie felter i tabellen.

2. Det skal være mulig å sortere på tabellheader som veksler mellom ascending og descending.

3. Legge til mulighet for filtrering på tabllen. Står fritt til å velge hvordan filtrering en ønsker.

4. Legge til mulighet for å gå inn på et item for å få flere detaljer om dataen. Dette kan f.eks være
   en modal når en trykker på elemtenter i listen eller å videresende til en spesifikk side.

5. Legg til støtte for pagination gjennom å bruke APIet.

## Hva har blitt gjort så langt?

- Henter og viser data fra et Lord Of The Rings API. Viser frem attributtene "Name", "Race", "Gender",
  "wikiUrl" og "birth" i form av karakterer fra Ringenes herre.
- Har lagt til støtte for pagination og staylet den med bootstrap.
- Har lagt til mulighet for å sortere acsending og descending på "Name".
- Har lagt til søkefelt hvor en kan søke på "Name" (Kan for øyeblikket kun søke på de navnene som vises
  på skjermen).
- Har lagt til mulighet å filtrere etter "Race - Elf" gjennom en checkbox. Pagination oppdaterer seg ved
  filtrering. (Skal legge til mulighet for å filtrere på alle "Race").
