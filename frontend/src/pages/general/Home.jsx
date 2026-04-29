import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const reelRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get('http://localhost:3000/api/food', {
          withCredentials: true,
          cancelToken: source.token,
        });

        const foodItems = response.data?.foodItems ?? response.data ?? [];
        setVideos(Array.isArray(foodItems) ? foodItems : []);
      } catch (fetchError) {
        if (!axios.isCancel(fetchError)) {
          console.error('Failed to fetch reels:', fetchError);
          setError('Unable to load reels. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();

    return () => {
      source.cancel('Component unmounted, cancel fetch');
    };
  }, []);

  useEffect(() => {
    const reelElement = reelRef.current;
    if (!reelElement || videos.length === 0) return;

    const videoElements = Array.from(reelElement.querySelectorAll('video'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.intersectionRatio >= 0.75)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        videoElements.forEach((video) => {
          if (visibleEntry?.target === video) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.75] }
    );

    videoElements.forEach((video) => observer.observe(video));
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [videos]);

  return (
    <main className="home-reels">
      {loading && (
        <div className="reel-empty-state">
          <span className="reel-loading">Loading reels...</span>
        </div>
      )}

      {error && (
        <div className="reel-empty-state reel-error">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="reel-empty-state">
          <span>No reels available right now.</span>
        </div>
      )}

      <div className="reel-list" ref={reelRef}>
        {videos.map((item, index) => (
          <section className="reel-card" key={item._id ?? `${item.foodPartner}-${index}`}>
            <video
              className="reel-video"
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
              autoPlay={index === 0}
            />

            <div className="reel-gradient" />

            <div className="reel-meta">
              <div className="reel-info">
                <div className="reel-title">{item.name}</div>
                <div className="reel-description">{item.description}</div>
              </div>

              <Link className="reel-button" to={`/food-partner/${item.foodPartner}`}>
                Visit Store
              </Link>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Home;