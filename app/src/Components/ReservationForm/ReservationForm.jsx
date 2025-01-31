import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../Components/Breadcrumb/Breadcrumb";
import { usePost } from "../../hooks/usePost";
import styles from "./ReservationForm.module.scss";

export const ReservationForm = () => {
  const { token, triggerReservationRefresh } = useContext(UserContext);
  const navigate = useNavigate();
  const [submitForm, setSubmitForm] = useState(false);
  
  const [formData, setFormData] = useState({
    hotel: "", roomType: "", numPersons: "", priceClass: "Normal",
    checkIn: "", checkOut: "", firstName: "", lastName: "", email: "",
    phone: "", comments: "", acceptedTerms: false,
  });

  const { data, error, isLoading } = usePost({
    url: submitForm ? "http://localhost:4000/reservations" : null, // ✅ Send kun, hvis formular er sendt
    body: formData, // ✅ Fjern `JSON.stringify` (usePost håndterer det)
    token,
  });

  // ✅ Når vi får svar, opdater dashboard og naviger
  if (data && submitForm) {
    triggerReservationRefresh();
    setTimeout(() => navigate("/dashboard"), 2000);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validateForm = () => {
    const requiredFields = ["hotel", "roomType", "numPersons", "checkIn", "checkOut", "firstName", "lastName", "email", "phone"];
    return requiredFields.every(field => formData[field]) && formData.acceptedTerms;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitForm(true); // ✅ Nu bliver API'et kaldt
  };

  return (
    <>
      <Breadcrumb />
      <div className={styles.reservationContainer}>
        <form className={styles.reservationForm} onSubmit={handleSubmit}>
          <h2>Reservation</h2>
          <p>Udfyld formularen for at reservere et værelse.</p>

          {["hotel", "roomType", "numPersons"].map((field) => (
            <select key={field} name={field} value={formData[field]} onChange={handleChange} required>
              <option value="">{`Vælg ${field === "hotel" ? "destination & hotel" : field}`}</option>
              {field === "hotel" && <option value="Hotel Overlook">Hotel Overlook</option>}
              {field === "roomType" && ["Standard", "Deluxe"].map(option => <option key={option} value={option}>{option}</option>)}
              {field === "numPersons" && [1, 2, 3].map(option => <option key={option} value={option}>{option} person{option > 1 && "er"}</option>)}
            </select>
          ))}

          <div className={styles.priceOptions}>
            <p>Vælg prisklasse:</p>
            {["Normal", "Flex"].map((option) => (
              <label key={option}>
                <input type="radio" name="priceClass" value={option} checked={formData.priceClass === option} onChange={handleChange} />
                {option}
              </label>
            ))}
          </div>

          <div className={styles.datePicker}>
            {["checkIn", "checkOut"].map((field) => (
              <input key={field} type="date" name={field} value={formData[field]} onChange={handleChange} required />
            ))}
          </div>

          {["firstName", "lastName", "email", "phone"].map((field) => (
            <input key={field} type={field === "email" ? "email" : field === "phone" ? "tel" : "text"} name={field} placeholder={field} value={formData[field]} onChange={handleChange} required />
          ))}

          <textarea name="comments" placeholder="Kommentarer" value={formData.comments} onChange={handleChange}></textarea>

          <label className={styles.terms}>
            <input type="checkbox" name="acceptedTerms" checked={formData.acceptedTerms} onChange={handleChange} />
            Jeg accepterer hermed Overlooks betingelser (sæt kryds)
          </label>

          {error && <p className={styles.error}>Kunne ikke oprette reservation.</p>}
          {isLoading && <p className={styles.loading}>Sender reservation...</p>}

          <div className={styles.buttons}>
            <button type="submit" className={styles.submit} disabled={isLoading}>Send reservation</button>
            <button type="reset" className={styles.cancel}>Annuller</button>
          </div>
        </form>
        <div className={styles.divider}></div>
      </div>
    </>
  );
};
