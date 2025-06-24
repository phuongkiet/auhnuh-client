import { MovieStatus } from "../models/movie.model";
import { Role, UserStatus } from "../models/user.model";

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

export const getRoleLabel = (role: number) => {
    switch (role) {
      case Role.Admin:
        return "Admin";
      case Role.Client:
        return "Client";
      default:
        return "Unknown Role";
    }
};

export const getStatusLabel = (status: number) => {
    switch (status) {
      case UserStatus.Active:
        return "Active";
      case UserStatus.Banned:
        return "Banned";
      default:
        return "Unknown Status";
    }
  };

export function toGMT7DateString(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  // Get UTC time + 7 hours (in ms)
  const gmt7 = new Date(d.getTime() + 7 * 60 * 60 * 1000);
  // Format as YYYY-MM-DD
  return gmt7.toISOString().slice(0, 10);
}