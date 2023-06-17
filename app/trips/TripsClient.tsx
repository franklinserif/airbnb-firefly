"use client";

import { FC, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeUser, safeReservations } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface Props {
  reservations: safeReservations[];
  currentUser?: SafeUser;
}

const TripsClient: FC<Props> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const handleCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => setDeletingId(""));
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="trips"
        subtitle="Where you'v been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation?.id}
            onAction={handleCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
