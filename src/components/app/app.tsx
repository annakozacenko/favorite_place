import styles from "./app.module.css";
import { AppHeader } from "../app-header";
import { FeedPlaces } from "../../pages/feed-places/feed-places";
import { PlacePage } from "../../pages/place/place";
import { DishPage } from "../../pages/dish/dish";
import { VisitPage } from "../../pages/visit/visit";
import { FormOfNewVisitPage } from "../../pages/form-new-visit/form-new-visit";
import { Routes, Route } from "react-router-dom";

function MainPage() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<FeedPlaces />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/dish/:id" element={<DishPage />} />
          <Route path="/visit/:id" element={<VisitPage />} />
          <Route path="/new-visit" element={<FormOfNewVisitPage />} />
        </Routes>
      </main>
    </>
  );
}

export default MainPage;
