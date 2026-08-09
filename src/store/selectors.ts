import { createSelector } from "@reduxjs/toolkit";
import { TPlace } from "./slices/placesSlice";
import { TVisit } from "./slices/visitsSlice";
import { RootState } from "./store";

const roundRating = (value: number) => Math.round(value * 10) / 10;

export const enrichPlaceWithVisitStats = (
  place: TPlace,
  visits: TVisit[]
): TPlace => {
  const placeVisits = visits.filter((visit) => visit.placeId === place.id);
  const visitCount = placeVisits.length;
  const avgRating =
    visitCount > 0
      ? placeVisits.reduce((sum, visit) => sum + visit.rating, 0) / visitCount
      : 0;

  return {
    ...place,
    visits: visitCount,
    rating: roundRating(avgRating),
  };
};

const applyFiltersAndSort = (
  places: TPlace[],
  filters: RootState["places"]["filters"],
  sort: RootState["places"]["sort"]
) => {
  let result = [...places];

  if (filters.category) {
    result = result.filter((place) => place.category === filters.category);
  }
  if (filters.search) {
    const search = filters.search.toLowerCase();
    result = result.filter((place) =>
      place.name.toLowerCase().includes(search)
    );
  }

  if (sort === "visitsHigh") {
    result.sort((a, b) => b.visits - a.visits);
  } else if (sort === "visitsLow") {
    result.sort((a, b) => a.visits - b.visits);
  } else if (sort === "ratingHigh") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === "ratingLow") {
    result.sort((a, b) => a.rating - b.rating);
  }

  return result;
};

export const selectProcessedPlaces = createSelector(
  [
    (state: RootState) => state.places.places,
    (state: RootState) => state.places.filters,
    (state: RootState) => state.places.sort,
    (state: RootState) => state.visits.visits,
  ],
  (places, filters, sort, visits) => {
    const enriched = places.map((place) =>
      enrichPlaceWithVisitStats(place, visits)
    );
    return applyFiltersAndSort(enriched, filters, sort);
  }
);

export const selectPlaceWithStats = createSelector(
  [
    (state: RootState) => state.places.places,
    (state: RootState) => state.visits.visits,
    (_: RootState, placeId: number) => placeId,
  ],
  (places, visits, placeId) => {
    const place = places.find((item) => item.id === placeId);
    if (!place) return null;
    return enrichPlaceWithVisitStats(place, visits);
  }
);

/** Последняя оценка блюда из визитов (по дате визита), иначе rating из каталога */
export const selectDishRatingFromVisits = createSelector(
  [
    (state: RootState) => state.visits.visits,
    (state: RootState) => state.dishes.dishes,
    (_: RootState, dishId: number) => dishId,
  ],
  (visits, dishes, dishId) => {
    const catalogRating = dishes.find((dish) => dish.id === dishId)?.rating ?? 0;
    let latestDate = "";
    let latestRating = catalogRating;

    for (const visit of visits) {
      const visitDish = visit.dishes.find((dish) => dish.id === dishId);
      if (!visitDish || visitDish.visitRating <= 0) continue;

      if (!latestDate || visit.date >= latestDate) {
        latestDate = visit.date;
        latestRating = visitDish.visitRating;
      }
    }

    return latestRating;
  }
);

export const selectFavoritePlacesWithStats = createSelector(
  [
    (state: RootState) => state.places.favoritePlaces,
    (state: RootState) => state.places.places,
    (state: RootState) => state.visits.visits,
  ],
  (favorites, places, visits) =>
    favorites.map((favorite) => {
      const place = places.find((item) => item.id === favorite.id) ?? favorite;
      return enrichPlaceWithVisitStats(place, visits);
    })
);
