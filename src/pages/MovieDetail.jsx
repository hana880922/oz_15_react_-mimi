import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieDetail.scss";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
          }
        );

        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("❌ 상세정보 로딩 실패:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <h2 className="loading">📦 상세정보 불러오는 중...</h2>;

  return (
    <div className="movie-detail">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="poster"
      />

      <div className="content">
        <h1>{movie.title}</h1>
        <p className="rating">⭐ {movie.vote_average.toFixed(1)}</p>
        <p className="genre">🎭 {movie.genres.map(g => g.name).join(", ")}</p>
        <p className="release">📅 개봉일: {movie.release_date}</p>

        <h3>📌 줄거리</h3>
        <p className="overview">{movie.overview}</p>
      </div>
    </div>
  );
}
