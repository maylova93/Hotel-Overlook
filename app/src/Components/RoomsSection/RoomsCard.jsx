import { useState, useEffect } from "react";
import styles from "./RoomsCard.module.scss";

export const RoomsCard = () => {
  const [room, setRoom] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const roomsImg = [
    "/room-standard-single-bed.jpg",
    "/room-superior-plus-bedroom.jpg",
    "/room-junior-suite-bedroom.jpg",
  ];

  const url = "http://localhost:4000/destinations/danmark/aalborg/overlook-aalborg-city";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.cities || !data.cities[0]?.hotels || !data.cities[0].hotels[0]?.rooms) {
          throw new Error("No rooms found");
        }

        setRoom(data.cities[0].hotels[0].rooms);
        console.log("Fetched data:", data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
<div className={styles.sectionWrapper}>
  <h3 className={styles.sectionTitle}>Se vores udvalg af værelser</h3>
  <section className={styles.cardRoom}>
    {room.slice(0, 3).map((item, index) => (
      <article key={item.id} className={styles.roomItem}>
        <img
          className={styles.roomImg}
          src={roomsImg[index % roomsImg.length]} 
          alt={item.name}
        />
        <div className={styles.overlay}>
          <h2 className={styles.title}>{item.name || item.title}</h2>
          <p className={styles.desc}>{item.description}</p>
        </div>
      </article>
    ))}
  </section>
</div>

  );
};
