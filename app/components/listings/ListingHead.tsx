"use client";

import { FC } from "react";
import Image from "next/image";
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface Props {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: FC<Props> = (props) => {
  const { title, locationValue, imageSrc, id, currentUser } = props;
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
