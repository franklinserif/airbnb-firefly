import { User, Listing, Reservation } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type safeReservations = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "libs"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListings;
};
