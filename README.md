# ✅ To-Do App (React + Categories)

🔍 Case study

Problem:
Chciałam stworzyć prototyp aplikacji do zarządzania zadaniami, który będzie łączył prostotę UX z solidnym podejściem do zarządzania stanem w React.

Rozwiązanie:
Zastosowałam useReducer + localStorage do centralnego zarządzania zadaniami i kategoriami. Wprowadziłam priorytety, terminy oraz możliwość eksportu/importu JSON, aby aplikacja była bardziej realistyczna.

Efekt:
Powstała lekka, responsywna aplikacja w React + Vite, która działa jak prawdziwy organizer. Wdrożyłam na Netlify.

---

## ✨ Funkcje
- Dodawanie, edycja, usuwanie zadań.
- Oznaczanie jako ukończone / aktywne.
- Kategorie (dodawanie, usuwanie, przypisywanie do zadań).
- Filtry: wszystkie, aktywne, ukończone + wyszukiwarka.
- Dane zapisywane w `localStorage`.
- Czysty, responsywny interfejs.

---

## 🛠️ Technologie
- **React 18** (komponenty funkcyjne, hooks)
- **useReducer** do zarządzania stanem globalnym
- **localStorage** do trwałości danych
- **Vite** jako bundler
- CSS3 (lekki dark UI)

---

## 📂 Struktura projektu
src/
├── App.jsx
├── main.jsx
├── components/
│ ├── Header.jsx
│ ├── TodoForm.jsx
│ ├── CategoryPicker.jsx
│ ├── Filters.jsx
│ ├── TodoItem.jsx
│ └── EmptyState.jsx
├── hooks/
│ └── useLocalStorage.js
└── styles.css

---

## 📸 Zrzuty ekranu
![screenshot-1](https://github.com/user-attachments/assets/3eda60ee-55bd-41a1-a9be-ae8070d4402a)


---

## 📌 Autor
Projekt stworzony przez **[Ania (annielanie-dev)](https://github.com/annielanie-dev)**  

---

## 📄 Licencja
Ten projekt dostępny na licencji [MIT](LICENSE).

---

## Uruchomienie
```bash
npm i
npm run dev
# build
npm run build&& npm run preview



