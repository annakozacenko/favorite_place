import styles from "./MainPage.module.css";
import { AppHeader } from "../Header";
import { FeedPlaces } from "../../pages/PlacesFeedPage/PlacesFeedPage";
import { PlacePage } from "../../pages/PlacePage/PlacePage";
import { DishPage } from "../../pages/DishPage/DishPage";
import { VisitPage } from "../../pages/VisitPage/VisitPage";
import { FormOfNewVisitPage } from "../../pages/NewVisitFormPage/NewVisitFormPage";
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
