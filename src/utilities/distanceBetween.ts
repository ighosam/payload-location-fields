export interface Coordinates {
  latitude: number
  longitude: number
}

export function distanceBetween(
  point1: Coordinates,
  point2: Coordinates,
): number {
  const earthRadiusKm = 6371

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180

  const lat1 = toRadians(point1.latitude)
  const lat2 = toRadians(point2.latitude)
  const deltaLat = toRadians(point2.latitude - point1.latitude)
  const deltaLon = toRadians(point2.longitude - point1.longitude)

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return earthRadiusKm * c
}