import { PropertyFilters } from "@/components/PropertySearch";

export const getFiltersFromUrl = (): Partial<PropertyFilters> => {
  const params = new URLSearchParams(window.location.search);
  
  return {
    searchQuery: params.get("q") || "",
    propertyType: params.get("type") || "all",
    priceRange: params.has("price") 
      ? params.get("price")?.split(",").map(Number) as [number, number] 
      : [0, 1000000],
    minBeds: params.has("beds") ? Number(params.get("beds")) : null,
    minBaths: params.has("baths") ? Number(params.get("baths")) : null,
    minSqft: params.has("sqft") ? Number(params.get("sqft")) : null,
    nearMe: params.get("nearMe") === "true",
    newListings: params.get("newListings") === "true",
  };
};

export const updateUrlWithFilters = (filters: Partial<PropertyFilters>) => {
  const params = new URLSearchParams();
  
  if (filters.searchQuery) params.set("q", filters.searchQuery);
  if (filters.propertyType && filters.propertyType !== "all") params.set("type", filters.propertyType);
  if (filters.priceRange) params.set("price", filters.priceRange.join(","));
  if (filters.minBeds) params.set("beds", filters.minBeds.toString());
  if (filters.minBaths) params.set("baths", filters.minBaths.toString());
  if (filters.minSqft) params.set("sqft", filters.minSqft.toString());
  if (filters.nearMe) params.set("nearMe", "true");
  if (filters.newListings) params.set("newListings", "true");
  
  const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  window.history.pushState({}, "", newUrl);
};