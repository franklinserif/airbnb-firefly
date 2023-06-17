"use client";

import { FC, useCallback, useState, useRef, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<Props> = ({ currentUser }) => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef?.current?.contains(e.target as Node) &&
      !buttonRef?.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleToggleOpen = useCallback(() => {
    setIsOpen((prevValue) => !prevValue);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, currentUser, rentModal]);

  return (
    <div className="relative">
      <div className="relative flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <button
          ref={buttonRef}
          onClick={handleToggleOpen}
          className="p-4 md:py-1 md:p-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push("favorites")}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="Airbnn my home" />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false);
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
