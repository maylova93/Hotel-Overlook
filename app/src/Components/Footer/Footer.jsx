import { NavLink } from "react-router-dom";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__copyright}>
        © 2021 Hotel Overlook. Alle rettigheder forbeholdt.
      </div>
      <div className={styles.footer__socials}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FaFacebookF />
        </a>
      </div>
      <nav className={styles.footer__links}>
        <NavLink to="/">Forside</NavLink>
        <NavLink to="/hotels">Hoteller & Destinationer</NavLink>
        <NavLink to="/rooms">Værelser</NavLink>
        <NavLink to="/reservation">Reservation</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </footer>
  );
}
