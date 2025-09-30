# Organizer zadań (React + Vite)
Prototyp aplikacji webowej do zarządzania zadaniami z kategoriami, priorytetem i terminem.

**Demo:** https://<twoj-projekt>.netlify.app  
**Repo:** https://github.com/<annielanie-dev>/todo-categories-react

🔍 Case study

Problem:
Chciałam stworzyć prototyp aplikacji do zarządzania zadaniami, który będzie łączył prostotę UX z solidnym podejściem do zarządzania stanem w React.

Rozwiązanie:
Zastosowałam useReducer + localStorage do centralnego zarządzania zadaniami i kategoriami. Wprowadziłam priorytety, terminy oraz możliwość eksportu/importu JSON, aby aplikacja była bardziej realistyczna i gotowa do pokazania w portfolio.

Efekt:
Powstała lekka, responsywna aplikacja w React + Vite, która działa jak prawdziwy organizer. Projekt opublikowałam na GitHub i wdrożyłam na Netlify/Vercel, aby rekruter mógł od razu przetestować demo.

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

