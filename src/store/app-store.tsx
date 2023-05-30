import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  LOCAL_KEYS,
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../utils/local-storage.util";
import MockUserDetails from "../fixture/user/user.json";
import { toast } from "react-hot-toast";
import { generateJwtToken } from "../utils/json-token.util";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { APP_ROUTE } from "../utils/route.constant";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (payload: { email: string; password: string }) => void;
  logout: () => void;
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const wait = (
  time: number,
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (
        (email === MockUserDetails.email &&
          password !== MockUserDetails.password) ||
        (email !== MockUserDetails.email &&
          password !== MockUserDetails.password)
      ) {
        reject(<p>User details are wrong</p>);
      }
      if (
        email === MockUserDetails.email &&
        password === MockUserDetails.password
      ) {
        const { password, ...restData } = MockUserDetails;
        const token = generateJwtToken(MockUserDetails);

        setLocalStorageItem(LOCAL_KEYS.ACCESS_TOKEN, token);
        setLocalStorageItem(LOCAL_KEYS.USER_DETAILS, restData);
        navigate(APP_ROUTE.DASHBOARD);
        resolve();
      } else {
        reject(
          <p>
            User with <b>{email}</b> not found
          </p>
        );
      }
    }, time);
  });
};

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const login = useCallback(
    async (payload: { email: string; password: string }) => {
      setIsLoggedIn(true);

      toast.promise(wait(2000, payload.email, payload.password, navigate), {
        loading: "please wait while we are searching for you",
        success: (successMsg) => {
          return "Login Successfull";
        },
        error: (err) => err,
      });
    },
    [navigate]
  );

  const logout = () => {
    setIsLoggedIn(false);
    removeLocalStorageItem(LOCAL_KEYS.ACCESS_TOKEN);
  };

  useEffect(() => {
    const token = getLocalStorageItem(LOCAL_KEYS.ACCESS_TOKEN);
    !!token && setIsAuthenticated(true);
  }, [login]);

  const value: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
