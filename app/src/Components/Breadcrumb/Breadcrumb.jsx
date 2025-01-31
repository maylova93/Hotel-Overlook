import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";

export const Breadcrumb = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className={styles.breadcrumb}>
      <Link to="/">Hotel Overlook</Link>
      {paths.map((segment, index) => (
        <span key={index}>
          {" > "}
          <Link to={`/${paths.slice(0, index + 1).join("/")}`}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </Link>
        </span>
      ))}
    </nav>
  );
};
