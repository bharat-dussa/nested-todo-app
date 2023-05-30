import React from "react";
import { User } from "../../utils/interfaces/user.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faAddressBook,
  faCalendarDays,
} from "@fortawesome/free-regular-svg-icons";
import {
  faPersonHalfDress,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../store/app-store";

const RenderIconWithContext = ({
  icon,
  context,
}: {
  icon: IconDefinition;
  context: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={icon} /> <p>{context}</p>
    </div>
  );
};

const ProfileCard = ({ UserDetails }: { UserDetails: User }) => {

  const { logout } = useAuth();
  
  return (
    <div className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100">
      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
        <img
          src="https://source.unsplash.com/75x75/?portrait"
          alt=""
          className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold text-center md:text-left">
            {UserDetails.name}
          </h4>
          <p className="dark:text-gray-400">{UserDetails.address}</p>
        </div>
      </div>
      <div className="flex justify-center pt-4 space-x-4 text-start">
        <div>
          <RenderIconWithContext
            icon={faAddressBook}
            context={UserDetails.address}
          />
          <RenderIconWithContext
            icon={faCalendarDays}
            context={UserDetails.dateOfBirth}
          />
          <RenderIconWithContext
            icon={faPersonHalfDress}
            context={UserDetails.gender}
          />
        </div>
      </div>
      <div className="cursor-pointer" onClick={logout}>
        <RenderIconWithContext icon={faRightFromBracket} context="Log out" />
      </div>
    </div>
  );
};

export default ProfileCard;
