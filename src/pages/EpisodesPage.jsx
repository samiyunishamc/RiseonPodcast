import EpisodeCard from "../components/episodes/EpisodeCard";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import FadeIn from "../components/ui/FadeIn";
import { pastPodcasts } from "../data/podcastData";
import { episodeCategories } from "../data/siteContent";
import { useMemo, useState } from "react";

const PAGE_SIZE = 6;

const EpisodesPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return pastPodcasts.filter((ep) => {
      const matchesCategory = category === "All" || ep.tag === category || ep.category === category;
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        ep.title?.toLowerCase().includes(query) ||
        ep.speaker?.toLowerCase().includes(query) ||
        ep.description?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <>
      <section className="page-hero section-space--tight">
        <div className="site-container">
          <FadeIn>
            <p className="section-eyebrow">Episodes</p>
            <h1 className="page-title">Episode library</h1>
            <p className="page-lead">
              Browse practical sessions and watch full stories on our YouTube channel.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <FadeIn className="flex flex-col lg:flex-row gap-4 mb-10">
            <div className="flex-1">
              <label htmlFor="episode-search" className="sr-only">Search episodes</label>
              <input
                id="episode-search"
                type="search"
                placeholder="Search by title, speaker, or topic..."
                className="form-input"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setVisible(PAGE_SIZE); }}
              />
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {episodeCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { setCategory(cat); setVisible(PAGE_SIZE); }}
                  className={`filter-chip ${category === cat ? "filter-chip--active" : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {shown.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shown.map((ep, index) => (
                  <FadeIn key={ep.id} delay={index * 0.04}>
                    <EpisodeCard episode={ep} index={index} />
                  </FadeIn>
                ))}
              </div>
              {hasMore && (
                <div className="text-center mt-12">
                  <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title={pastPodcasts.length === 0 ? "Episodes are being curated" : "No episodes found"}
              description={
                pastPodcasts.length === 0
                  ? "New podcast episodes will appear here as soon as they are published."
                  : "Try adjusting your search or filter to find episodes."
              }
              action={<Button href="https://youtube.com/@RiseOnPodcast">Subscribe on YouTube</Button>}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                </svg>
              }
            />
          )}
        </div>
      </section>
    </>
  );
};

export default EpisodesPage;
