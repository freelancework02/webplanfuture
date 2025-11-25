import React, { useEffect, useMemo, useState } from 'react';
import './EventPop.css';

const DEFAULT_API = 'https://weplanfuture.com/api';

const EventPop = ({ apiBase = DEFAULT_API }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    let active = true;
    const loadLatest = async () => {
      setLoading(true);
      try {
        const listUrl = `${apiBase}/events?per=3&page=1`;
        const resp = await fetch(listUrl, { credentials: 'include' });
        let payloadText;
        if (resp.ok) {
          payloadText = await resp.text();
        } else {
          const fallback = await fetch(`${apiBase}/events`, { credentials: 'include' });
          if (!fallback.ok) throw new Error(`Events API failed (${resp.status})`);
          payloadText = await fallback.text();
        }
        const safeJson = safeParse(payloadText);
        const entry = pickLatestEvent(safeJson);
        if (!entry) {
          if (active) {
            setEvent(null);
            setLoading(false);
          }
          return;
        }

        // hydrate with detail if list misses cover image
        let hydrated = entry;
        const entryId = entry.id ?? entry.ID ?? entry.event_id;
        if (!hasRenderableImage(entry, apiBase) && entryId) {
          try {
            const detailResp = await fetch(`${apiBase}/events/${encodeURIComponent(entryId)}`, { credentials: 'include' });
            if (detailResp.ok) {
              const detailJson = safeParse(await detailResp.text());
              const enriched = detailJson?.event || detailJson?.data || detailJson;
              hydrated = { ...entry, ...(typeof enriched === 'object' ? enriched : null) };
            }
          } catch (err) {
            console.warn('event pop detail fetch failed', err);
          }
        }

        if (active) {
          setEvent(mapEventFields(hydrated, apiBase));
          setLoading(false);
        }
      } catch (err) {
        console.error('EventPop fetch failed', err);
        if (active) {
          setEvent(null);
          setLoading(false);
        }
      }
    };

    loadLatest();
    return () => {
      active = false;
    };
  }, [apiBase]);

  const memoEvent = useMemo(() => event, [event]);

  if (loading || !memoEvent) return null;

  const { cover, title, date, hostedBy, link } = memoEvent;

  return (
    <div className={`event-pop-wrapper ${isOpen ? 'open' : 'minimized'}`}>
      {isOpen ? (
        <article className="event-pop-card">
          <button
            type="button"
            className="event-pop-close"
            aria-label="Minimize event announcement"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
          {cover && (
            <div className="event-pop-image">
              <img src={cover} alt={title} loading="lazy" />
            </div>
          )}
          <div className="event-pop-content">
            <p className="event-pop-label">New Event</p>
            <h4>{title}</h4>
            <p className="event-pop-meta">
              <span>{date}</span>
              {hostedBy && <span>Hosted by {hostedBy}</span>}
            </p>
            {link && (
              <a className="event-pop-link" href="/events">
                View Details
              </a>
            )}
          </div>
        </article>
      ) : (
        <button
          type="button"
          className="event-pop-minimized-pill"
          onClick={() => setIsOpen(true)}
          aria-label="Expand event announcement"
        >
          Upcoming: {title}
        </button>
      )}
    </div>
  );
};

export default EventPop;

const safeParse = (payload) => {
  if (!payload) return null;
  try {
    return JSON.parse(payload);
  } catch (_) {
    return null;
  }
};

const pickLatestEvent = (json) => {
  const arr = Array.isArray(json)
    ? json
    : Array.isArray(json?.data)
    ? json.data
    : Array.isArray(json?.rows)
    ? json.rows
    : [];
  if (!arr.length) return null;
  return [...arr].sort((a, b) => {
    const ta = new Date(a.event_date || a.created_at || a.createdAt || 0).getTime();
    const tb = new Date(b.event_date || b.created_at || b.createdAt || 0).getTime();
    return tb - ta;
  })[0];
};

const mapEventFields = (entry = {}, apiBase) => {
  const explicitLink = entry.link || entry.event_link || entry.registration_link;
  const slug = entry.slug || entry.permalink;
  const gallery = extractImageCandidates(entry, apiBase);

  return {
    title: entry.title || entry.name || 'Upcoming Event',
    date: formatDate(entry.event_date || entry.date || entry.created_at),
    hostedBy: entry.host || entry.hosted_by || entry.organizer || entry.company,
    cover: gallery[0] || null,
    link: explicitLink || (slug ? `/events/${slug}` : '/events'),
  };
};

const formatDate = (value) => {
  if (!value) return 'Date TBA';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const hasRenderableImage = (entry, apiBase) => extractImageCandidates(entry, apiBase).length > 0;

const extractImageCandidates = (entry = {}, apiBase) => {
  if (!entry) return [];

  const arrays = entry.images ?? entry.image_list ?? entry.photos ?? entry.photos_list;
  if (Array.isArray(arrays) && arrays.length) {
    return resolveImageArray(arrays, apiBase);
  }

  const id = entry.cover_image_id ?? entry.coverImageId ?? entry.cover_image ?? entry.coverImage;
  if (id) return [buildBlobUrl(apiBase, 'events', id)];

  const direct =
    entry.cover_image_url ||
    entry.image_url ||
    entry.thumbnail ||
    entry.cover ||
    entry.hero ||
    entry.banner;
  if (direct) return [direct];

  return [];
};

const resolveImageArray = (arr, apiBase) =>
  arr
    .map((item) => {
      if (!item) return null;
      if (typeof item === 'string') return item;
      const ref = item.id ?? item.ID ?? item.image_id ?? item.imageId;
      if (ref) return buildBlobUrl(apiBase, 'events', ref);
      return item.url || item.image_url || item.path || null;
    })
    .filter(Boolean);

const buildBlobUrl = (base, collection, id) => {
  if (!base || !id) return null;
  return `${base.replace(/\/$/, '')}/${collection}/image/${encodeURIComponent(id)}/blob`;
};