import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";
import { handleUseContext } from "./generic-context";
import { GlobalMarketTrend } from "libs/types/trending-list";

const GlobalTrendContext = createContext<{
  marketTrend: GlobalMarketTrend;
  marketTrendLoading: boolean;
}>({
  marketTrend: {} as GlobalMarketTrend,
  marketTrendLoading: true,
});

export const GlobalTrendProvider = ({ children }: { children: ReactNode }) => {
  const [marketTrend, setMarketTrend] = useState<GlobalMarketTrend>({} as GlobalMarketTrend);
  const [marketTrendLoading, setMarketTrendLoading] = useState(true);

  const updateMarketTrend = useCallback((newMarketTrend: GlobalMarketTrend) => {
    setMarketTrend(newMarketTrend);
    setMarketTrendLoading(false);
  }, []);

  useEffect(() => {
    async function fetchGlobalTrend() {
      try {
        const response = await fetch('/api/global-trend');
        const {data} = await response.json();
        updateMarketTrend(data);
      } catch (error) {
        console.error('Error fetching global trend:', error);
      }
    }
    fetchGlobalTrend();
  }, []);

  return (
    <GlobalTrendContext.Provider value={{ marketTrend, marketTrendLoading }}>
      {children}
    </GlobalTrendContext.Provider>
  );
};

export const useGlobalTrend = () => handleUseContext(GlobalTrendContext, 'GlobalTrend');