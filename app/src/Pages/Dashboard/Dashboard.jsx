import { useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import styles from "./Dashboard.module.scss";

export function Dashboard() {
  const { userData, token, refreshReservations } = useContext(UserContext);
  const navigate = useNavigate();

  // 🔥 Nu genhenter vi reservationer, når `refreshReservations` ændres!
  const { data: reservations, error, isLoading } = useGet(
    `http://localhost:4000/reservations`,
    token
  );

  useEffect(() => {
    console.log("🔄 Opdaterer reservationer...");
  }, [refreshReservations]); // 🚀 Hver gang refreshReservations ændres, genhenter vi data

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.heading}>Velkommen {userData?.name || "Bruger"}!</h1>

      <h2 className={styles.subheading}>Dine Reservationer</h2>

      {isLoading && <p className={styles.loading}>Indlæser reservationer...</p>}
      {error && <p className={styles.error}>Kunne ikke hente reservationer: {error.message}</p>}

      {reservations?.length > 0 ? (
        <ul className={styles.reservationList}>
          {reservations.map((res) => (
            <li key={res.id} className={styles.reservationItem}>
              {res.firstName} {res.lastName} - {res.email}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReservations}>Ingen reservationer fundet.</p>
      )}

      <button className={styles.backButton} onClick={() => navigate("/")}>
        Tilbage til forsiden
      </button>
    </div>
  );
}
