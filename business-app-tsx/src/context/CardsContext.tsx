import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import axiosInstance, { errorResponse } from '../api';
import CardData from '../api/CardData';

interface CardContextType {
  loading: boolean;
  fetching: boolean;
  data: CardData[];
  fetchCards: () => void;
}

export const CardContext = createContext<CardContextType | undefined>(
  undefined
);

interface CardsProviderProps {
  children: ReactNode;
}

const CardsProvider = ({ children }: CardsProviderProps) => {
  const [state, setState] = useState<CardContextType>({
    fetching: true,
    loading: false,
    data: [],
    fetchCards: async () => {
      try {
        const resp = await axiosInstance.get('/cards');
        setState(prevState => ({
          ...prevState,
          fetching: false,
          data: resp.data,
        }));
      } catch (er) {
        toast.error(errorResponse(er));
      }
    },
  });

  return <CardContext.Provider value={state}>{children}</CardContext.Provider>;
};

const useCards = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
};

export { CardsProvider, useCards };
