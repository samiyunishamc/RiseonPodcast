import Button from "../ui/Button";
import Card from "../ui/Card";
import Tag from "../ui/Tag";

const EpisodeCard = ({ episode, index }) => {
  const thumbnail = episode.thumbnail || null;

  return (
    <Card interactive className="episode-card">
      <div className="episode-card__thumb">
        {thumbnail ? (
          <img src={thumbnail} alt="" loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <Tag>{episode.tag || episode.category || "Episode"}</Tag>
            <p className="text-sm font-bold" style={{ color: "var(--ink-soft)" }}>Ep. {index + 1}</p>
          </div>
        )}
        <div className="episode-card__play">
          <a
            href={episode.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="episode-card__play-btn"
            aria-label={`Play ${episode.title}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </a>
        </div>
      </div>
      <div className="card-padded flex flex-col flex-1">
        <div className="episode-card__meta">
          <Tag variant="muted">{episode.tag || episode.category || "Podcast"}</Tag>
          {episode.duration && <span className="episode-card__date">{episode.duration}</span>}
          {episode.date && <span className="episode-card__date">{episode.date}</span>}
        </div>
        <h3 className="text-xl font-bold mb-2">{episode.title}</h3>
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--muted)" }}>{episode.speaker}</p>
        <p className="text-base leading-relaxed mb-6 flex-1" style={{ color: "var(--muted)" }}>
          {episode.description}
        </p>
        <div className="flex gap-2">
          <Button href={episode.youtubeUrl} className="flex-1">Watch</Button>
          <Button href={episode.youtubeUrl} variant="secondary" className="flex-1">Listen</Button>
        </div>
      </div>
    </Card>
  );
};

export default EpisodeCard;
