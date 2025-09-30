import { useEffect, useRef, useState } from "react";


export function useLocalStorage(key, defaultValue) {
const isFirst = useRef(true);
const [value, setValue] = useState(() => {
try {
const raw = localStorage.getItem(key);
return raw ? JSON.parse(raw) : defaultValue;
} catch {
return defaultValue;
}
});


useEffect(() => {
if (isFirst.current) {
isFirst.current = false;
return;
}
try {
localStorage.setItem(key, JSON.stringify(value));
} catch {}
}, [key, value]);


return [value, setValue];
}
