import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [adminCollections, setAdminCollections] = useState([]);

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
    setSavedItems([]);
    setCollections([]);
    setAdminCollections([]);
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
    localStorage.removeItem('savedItems');
    localStorage.removeItem('collections');
    localStorage.removeItem('adminCollections');
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

  const toggleSaved = (itemId) => {
    setSavedItems(prev => {
      const newSaved = prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
      localStorage.setItem('savedItems', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const createUserCollection = (name, itemIds = []) => {
    const newCollection = {
      id: `user-${Date.now()}`,
      name,
      items: itemIds,
      createdBy: user?.id,
      createdAt: new Date().toISOString(),
      isUserCreated: true
    };
    setCollections(prev => {
      const updated = [...prev, newCollection];
      localStorage.setItem('collections', JSON.stringify(updated));
      return updated;
    });
    return newCollection;
  };

  const deleteUserCollection = (collectionId) => {
    setCollections(prev => {
      const updated = prev.filter(c => c.id !== collectionId);
      localStorage.setItem('collections', JSON.stringify(updated));
      return updated;
    });
  };

  const addItemToUserCollection = (collectionId, itemId) => {
    setCollections(prev => {
      const updated = prev.map(c => 
        c.id === collectionId 
          ? { ...c, items: [...new Set([...c.items, itemId])] }
          : c
      );
      localStorage.setItem('collections', JSON.stringify(updated));
      return updated;
    });
  };

  const removeItemFromUserCollection = (collectionId, itemId) => {
    setCollections(prev => {
      const updated = prev.map(c =>
        c.id === collectionId
          ? { ...c, items: c.items.filter(id => id !== itemId) }
          : c
      );
      localStorage.setItem('collections', JSON.stringify(updated));
      return updated;
    });
  };

  const createAdminCollection = (name, itemIds = [], featured = false) => {
    const newCollection = {
      id: `admin-${Date.now()}`,
      name,
      items: itemIds,
      featured,
      createdAt: new Date().toISOString(),
      isAdminCollection: true
    };
    setAdminCollections(prev => {
      const updated = [...prev, newCollection];
      localStorage.setItem('adminCollections', JSON.stringify(updated));
      return updated;
    });
    return newCollection;
  };

  const deleteAdminCollection = (collectionId) => {
    setAdminCollections(prev => {
      const updated = prev.filter(c => c.id !== collectionId);
      localStorage.setItem('adminCollections', JSON.stringify(updated));
      return updated;
    });
  };

  const updateAdminCollection = (collectionId, updates) => {
    setAdminCollections(prev => {
      const updated = prev.map(c =>
        c.id === collectionId ? { ...c, ...updates } : c
      );
      localStorage.setItem('adminCollections', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedFavorites = localStorage.getItem('favorites');
    const storedSavedItems = localStorage.getItem('savedItems');
    const storedCollections = localStorage.getItem('collections');
    const storedAdminCollections = localStorage.getItem('adminCollections');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedSavedItems) setSavedItems(JSON.parse(storedSavedItems));
    if (storedCollections) setCollections(JSON.parse(storedCollections));
    if (storedAdminCollections) setAdminCollections(JSON.parse(storedAdminCollections));
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      favorites, 
      toggleFavorite,
      savedItems,
      toggleSaved,
      collections, 
      createUserCollection,
      deleteUserCollection,
      addItemToUserCollection,
      removeItemFromUserCollection,
      adminCollections,
      createAdminCollection,
      deleteAdminCollection,
      updateAdminCollection
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
