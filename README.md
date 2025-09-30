# Organizer zadań (React + Vite)
Prototyp aplikacji webowej do zarządzania zadaniami z kategoriami, priorytetem i terminem.

**Demo:** https://<twoj-projekt>.netlify.app  
**Repo:** https://github.com/<annielanie-dev>/todo-categories-react

## Funkcje
- Kategorie: dodawanie, wybór, usuwanie (bazowa „Główne” chroniona).
- CRUD zadań, filtrowanie (wszystkie/aktywne/ukończone), wyszukiwarka.
- Priorytet (niski/średni/wysoki) i termin (deadline, oznaczenie „po terminie”).
- Sortowanie: najnowsze / A–Z / ukończone na dół.
- Eksport/Import JSON, „Przywróć dane demo”.
- Trwałość w `localStorage`.

## Tech
Vite, React, useReducer, custom hook `useLocalStorage`, czysty CSS.

## Uruchomienie
```bash
npm i
npm run dev
# build
npm run build; npm run preview

