import { Link } from "react-router-dom";
import styles from "./HighlightsSection.module.scss";
import { useGet } from "../../hooks/useGet";

export function HighlightsSection() {
  const { data, error, isLoading } = useGet("http://localhost:4000/news");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!data) return null;

  const latestNews = data.slice(0, 3); 

  return (
    <section className={styles.cardContainer}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Sidste nyt</h2>
      </div>
      <div className={styles.cardNews}>
        {latestNews.map((item) => (
          <article key={item.id} className={styles.newsItem}>
            <Link to={`/news/${item.id}`}>
              <img
                className={styles.newsImg}
                src={`./${item.image.filename}`}
                alt={item.title}
              />
            </Link>

            <div className={styles.overlay}>
              <h2 className={styles.title}>{item.title.slice(0, 80)}</h2>
              <p className={styles.teaser}>{item.teaser}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}