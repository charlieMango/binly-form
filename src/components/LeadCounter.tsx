import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const POLL_INTERVAL = 3000;
const INITIAL_COUNT = 3000;

const LeadCounter: React.FC = () => {
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const [prevCount, setPrevCount] = useState<number>(INITIAL_COUNT);
  const intervalRef = useRef<number | null>(null);

  const fetchCount = async () => {
    try {
      const response = await fetch(
        "https://api.binly-landing.ru/api/form/count"
      );
      const { count: backendCount } = await response.json();

      const newCount = INITIAL_COUNT + backendCount;

      if (newCount !== count) {
        setPrevCount(count);
        setCount(newCount);
      }
    } catch (error) {
      console.error("LeadCounter fetch error:", error);
    }
  };

  useEffect(() => {
    // Initial load and polling
    fetchCount();
    intervalRef.current = window.setInterval(fetchCount, POLL_INTERVAL);

    // Instant update via custom event
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (detail !== count) {
        setPrevCount(count);
        setCount(detail);
      }
    };
    window.addEventListener("lead_count_updated", handler as EventListener);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      window.removeEventListener(
        "lead_count_updated",
        handler as EventListener
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="mb-6 text-center text-3xl md:text-4xl font-bold text-[#8C7D69]">
      <CountUp start={prevCount} end={count} duration={1} separator=" " />
      <span className="ml-2">человек уже с нами</span>
    </div>
  );
};

export default LeadCounter;
