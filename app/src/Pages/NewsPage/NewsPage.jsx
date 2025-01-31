import { useParams } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import styles from "./NewsPage.module.scss";

export function NewsPage() {
  const { id } = useParams(); 
  const { data, error, isLoading } = useGet(`http://localhost:4000/news/${id}`);
  
  console.log("Fetching news data...");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading news</p>;
  if (!data) return <p>News not found</p>;


  const imageMap = {
    "1": "/nyhed-island.jpeg",
    "2": "/nyhed-berlin.jpeg",
    "3": "/nyhed-gdansk.jpeg",
  };

  const newsImage = imageMap[id] || "/default-news.jpg"; 

  return (
    <section className={styles.newsContainer}>
      <div className={styles.imageContainer}>
        <img src={newsImage} alt={data.title} className={styles.newsImg} />
      </div>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.content}>{data.content}</p>
      </div>
    </section>
  );
}
