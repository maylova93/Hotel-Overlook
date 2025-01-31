import { useEffect, useState } from "react";

export function usePost({ url, body, token }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return; // ✅ Stop API-kald, hvis URL ikke er gyldig

    setIsLoading(true);
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ Sørg for, at backend forstår JSON
        ...(token && { Authorization: `Bearer ${token}` }), // ✅ Kun tilføj token, hvis det findes
      },
      body: JSON.stringify(body), // ✅ Sørg for, at body sendes korrekt
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Fejl! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [url, body]); // ✅ Kun genkør, hvis URL eller body ændres

  return { data, error, isLoading };
}
