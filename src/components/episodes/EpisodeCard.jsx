import Button from "../ui/Button";
import Card from "../ui/Card";
import Tag from "../ui/Tag";

const EpisodeCard = ({ episode, index }) => (
  <Card interactive className="overflow-hidden flex flex-col h-full">
    <div
      className="h-44 px-5 py-4 flex flex-col justify-between"
      style={{ background: "linear-gradient(135deg, var(--accent-soft) 0%, var(--bg-alt) 100%)" }}
    >
      <Tag>{episode.tag || episode.category || "Episode"}</Tag>
      <p className="text-sm font-bold" style={{ color: "var(--ink-soft)" }}>
        Episode {index + 1}
      </p>
    </div>
    <div className="card-padded flex flex-col flex-1">
      <h3 className="text-2xl mb-2">{episode.title}</h3>
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--muted)" }}>{episode.speaker}</p>
      {episode.date && (
        <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
          {episode.date}{episode.duration ? ` · ${episode.duration}` : ""}
        </p>
      )}
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--muted)" }}>
        {episode.description}
      </p>
      <Button href={episode.youtubeUrl} variant="secondary" className="w-full">
        Watch Episode
      </Button>
    </div>
  </Card>
);

export default EpisodeCard;
