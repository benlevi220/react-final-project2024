import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance, { errorResponse } from '../api';
import CardData from '../api/CardData';

interface UserData {
  // Define your user data structure here
}

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  fetchingCards: boolean;
  loading: boolean;
  myCards: CardData[];
  handleLogin: (userData: UserData) => void;
  handleLogout: () => void;
  fetchMyCards: () => void;
  createCard: (values: any) => void;
  updateCard: (cardId: string, values: any) => void;
  deleteCard: (cardId: string, bizNumber: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthContextType>({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    userData: JSON.parse(localStorage.getItem('bcard2') || 'null'),
    myCards: [],
    fetchingCards: true,
    loading: false,
    handleLogin: (userData: UserData) => {
      setState({ ...state, isLoggedIn: true, userData });
    },
    handleLogout: () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('bcard2');
      setState({ ...state, isLoggedIn: false, userData: null });
    },
    fetchMyCards: async () => {
      try {
        const resp = await axiosInstance.get('/cards/my-cards');
        setState(prevState => ({ ...prevState, myCards: resp.data }));
      } catch (er) {
        toast.error(errorResponse(er));
      } finally {
        setState(prevState => ({ ...prevState, fetchingCards: false }));
      }
    },
    createCard: async (values: any) => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const resp = await axiosInstance.post('/cards', values);
        setState(prevState => ({
          ...prevState,
          myCards:
            prevState.myCards && prevState.myCards.length > 0
              ? [...prevState.myCards, resp.data]
              : [resp.data],
        }));
        navigate('/my-cards');
      } catch (er) {
        toast.error(errorResponse(er));
      } finally {
        setState(prevState => ({ ...prevState, loading: false }));
      }
    },
    updateCard: async (cardId: string, values: any) => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const resp = await axiosInstance.put(`/cards/${cardId}`, values);
        setState(prevState => ({
          ...prevState,
          myCards: [...prevState.myCards, resp.data],
        }));
        toast.success('Card updated successfully');
        navigate('/my-cards');
      } catch (er) {
        toast.error(errorResponse(er));
      } finally {
        setState(prevState => ({ ...prevState, loading: false }));
      }
    },
    deleteCard: async (cardId: string, bizNumber: string) => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const resp = await axiosInstance.delete(`/cards/${cardId}`, {
          bizNumber,
        });
        setState(prevState => ({
          ...prevState,
          myCards: prevState.myCards.filter(el => el._id !== resp.data._id),
        }));
        toast.success('Card deleted successfully');
      } catch (er) {
        toast.error(errorResponse(er));
      } finally {
        setState(prevState => ({ ...prevState, loading: false }));
      }
    },
  });

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
