export const formatCoordinates = (location: {
  lat: number;
  long: number;
}): string => {
  const { lat, long } = location;

  const latitude = `${lat}${lat.toString().startsWith("-") ? "° S" : "° N"}`;
  const longitude = `${long}${long.toString().startsWith("-") ? "° W" : "° E"}`;

  return [latitude, longitude].join(", ").replace(/\-/g, "");
};
