import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const { userData } = useContext(UserContext);

  return (
    <header className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <img src={"./HotelLogo.png"} alt="Hotel Overlook Logo" />
      </div>
      <nav className={styles.navbar__links}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
          FORSIDE
        </NavLink>
        <span>|</span>
        <NavLink to="/hotels" className={({ isActive }) => (isActive ? styles.active : "")}>
          HOTELLER & DESTINATIONER
        </NavLink>
        <span>|</span>
        <NavLink to="/rooms" className={({ isActive }) => (isActive ? styles.active : "")}>
          VÆRELSER
        </NavLink>
        <span>|</span>
        <NavLink to="/reservation" className={({ isActive }) => (isActive ? styles.active : "")}>
          RESERVATION
        </NavLink>
        <span>|</span>

        {userData ? (
          <NavLink to="/dashboard" className={styles.navbar__user}>
            Velkommen, {userData.name}
          </NavLink>
        ) : (
          <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}>
            LOGIN
          </NavLink>
        )}
      </nav>
    </header>
  );
}
