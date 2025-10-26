import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [collections, setCollections] = useState([]);

  const login = (email, password, role = 'subscriber') => {
    const userData = { 
      id: Date.now(), 
      email, 
      role,
      name: email.split('@')[0],
      joinedDate: new Date().toISOString()
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('collections', JSON.stringify(collections));
    
    // Return the role so caller can redirect accordingly
    return role;
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setCollections([]);
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    localStorage.removeItem('collections');
    return true; // Return flag for redirect
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const addToCollection = (collectionName, itemId) => {
    setCollections(prev => {
      const collection = prev.find(c => c.name === collectionName);
      let newCollections;
      if (collection) {
        newCollections = prev.map(c => 
          c.name === collectionName 
            ? { ...c, items: [...new Set([...c.items, itemId])] }
            : c
        );
      } else {
        newCollections = [...prev, { 
          name: collectionName, 
          items: [itemId], 
          createdAt: new Date().toISOString() 
        }];
      }
      localStorage.setItem('collections', JSON.stringify(newCollections));
      return newCollections;
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedFavorites = localStorage.getItem('favorites');
    const storedCollections = localStorage.getItem('collections');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedCollections) setCollections(JSON.parse(storedCollections));
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      favorites, 
      toggleFavorite, 
      collections, 
      addToCollection 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
