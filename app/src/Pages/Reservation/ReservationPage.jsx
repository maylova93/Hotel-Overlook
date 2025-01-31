import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ReservationForm } from "../../Components/ReservationForm/ReservationForm";

export const ReservationPage = () => {
  const { token } = useContext(UserContext);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchReservations = async () => {
      const response = await fetch("http://localhost:4000/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        console.error("Kunne ikke hente reservationer");
      }
    };

    fetchReservations();
  }, [token]);

  return (
    <div>
     
      <ReservationForm/>
      {token ? (
        <ul>
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <li key={res.id}>
                {res.hotel_name}  {res.room_id}  {res.num_persons}
              </li>
            ))
          ) : (
            <p>Ingen reservationer fundet.</p>
          )}
        </ul>
      ) : (
        <p>Log ind for at se dine reservationer.</p>
      )}
    </div>
  );
};
