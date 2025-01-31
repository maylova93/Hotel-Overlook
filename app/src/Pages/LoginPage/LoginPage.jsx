import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../../Components/Breadcrumb/Breadcrumb";
import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = {
      username: "test@example.com",
      password: "password123",
      name: "Makka",
    };

    if (
      credentials.username === storedUser.username &&
      credentials.password === storedUser.password
    ) {
      alert("Login succesfuld!");
      login({ username: storedUser.username, name: storedUser.name }, "fakeToken123");
      navigate("/dashboard");
    } else {
      alert("Forkert brugernavn eller adgangskode");
    }
  };

  return (
    <div className={styles.container}>
         <Breadcrumb />
      <div className={styles.loginSection}>
        <h2 className={styles.title}>Login</h2>
        <p className={styles.subtitle}>Indtast dit brugernavn og adgangskode for at logge ind</p>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <input
            type="email"
            name="username"
            placeholder="Brugernavn"
            value={credentials.username}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            name="password"
            placeholder="Adgangskode"
            value={credentials.password}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.loginButton}>Login</button>
            <button type="button" className={styles.cancelButton}>Annuller</button>
          </div>
        </form>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.rightSection}></div>
    </div>
  );
};
