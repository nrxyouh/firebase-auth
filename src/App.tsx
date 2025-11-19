import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, getAuth, type User } from "firebase/auth";
import { useEffect, useState } from "react";

import { app } from "./firebase";
import { ProtectedRoute } from "./components/protectedRoute";
import { Home } from "./pages/home";
import { Private } from "./pages/private";

import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsFetching(false);
        setUser(currentUser);
      } else {
        setUser(null);
        setIsFetching(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (isFetching) {
    return <h2>Loading...</h2>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home user={user} />} />
        <Route
          path="/private"
          element={
            <ProtectedRoute user={user}>
              <Private />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
