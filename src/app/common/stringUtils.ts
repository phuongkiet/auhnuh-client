import { MovieStatus } from "../models/movie.model";

/**
 * Formats enum values by adding spaces before capital letters
 * Example: "OnAir" -> "On Air", "ComingSoon" -> "Coming Soon"
 */
export const formatEnumValue = (value: string): string => {
  return value.replace(/([A-Z])/g, ' $1').trim();
};

/**
 * Formats MovieStatus enum values with proper spacing
 */
export const formatMovieStatus = (status: MovieStatus): string => {
  const statusString = MovieStatus[status];
  return formatEnumValue(statusString);
}; 