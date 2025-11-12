import { BookOpen, Crown, Landmark, Sword } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getHistoryCards } from "../lib/api/historyCards";
import HistorySection from "../components/HistorySection";
import { youtube_link } from "../utils/constants";

export default function HistoryView() {
  const [periods, setPeriods] = useState([]);
  const icons = [
    <BookOpen className="w-8 h-8 text-white" />,
    <Crown className="w-8 h-8 text-white" />,
    <Landmark className="w-8 h-8 text-white" />,
    <Sword className="w-8 h-8 text-white" />,
  ];

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await getHistoryCards();

      if (error) return;

      setPeriods(data);
    };

    fetch();
  }, []);

  return (
    <HistorySection
      periods={periods}
      icons={icons}
      youtube_link={youtube_link}
    />
  );
}
