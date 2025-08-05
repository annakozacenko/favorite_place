import styles from "./app.module.css";
import { AppHeader } from "../app-header";
import { FeedPlaces } from "../../pages/feed-places/feed-places";
import { Place } from "../../pages/place/place";
import { Dish } from "../../pages/dish/dish";
import { Visit } from "../../pages/visit/visit";
import { FormOfNewVisit } from "../../pages/form-new-visit/form-new-visit";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<FeedPlaces />} />
          <Route path="/place/:id" element={<Place />} />
          <Route path="/dish/:id" element={<Dish />} />
          <Route path="/visit/:id" element={<Visit />} />
          <Route path="/new-visit" element={<FormOfNewVisit />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
