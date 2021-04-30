export const formatCoordinates = (location: {
  lat: number;
  long: number;
}): string => {
  const { lat, long } = location;

  const latitude = `${lat.toFixed(3)}${lat.toString().startsWith("-") ? "° S" : "° N"}`;
  const longitude = `${long.toFixed(3)}${long.toString().startsWith("-") ? "° W" : "° E"}`;

  return [latitude, longitude].join(", ").replace(/\-/g, "");
};
