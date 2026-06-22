const STORAGE_KEY = "riseonPodcastRequests";

const readRequests = () => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeRequests = (requests) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
};

export const getPodcastRequests = () => readRequests();

export const addPodcastRequest = (request) => {
  const all = readRequests();
  const next = [request, ...all];
  writeRequests(next);
  return next;
};

export const removePodcastRequest = (requestId) => {
  const all = readRequests();
  const next = all.filter((item) => item.id !== requestId);
  writeRequests(next);
  return next;
};

export const PODCAST_REQUEST_EVENT = "podcast-request-submitted";

