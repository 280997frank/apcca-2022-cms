import { HStack } from "@chakra-ui/react";
import React from "react";
import { Icon } from "@chakra-ui/react";

const Approve = () => {
  return (
    <HStack justifyContent="space-around">
      <Icon viewBox="0 0 32 32" style={{ cursor: "pointer" }}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="16" fill="#22DA56" />
          <path
            d="M12.7951 19.8754L9.32506 16.4054C8.93506 16.0154 8.30506 16.0154 7.91506 16.4054C7.52506 16.7954 7.52506 17.4254 7.91506 17.8154L12.0951 21.9954C12.4851 22.3854 13.1151 22.3854 13.5051 21.9954L24.0851 11.4154C24.4751 11.0254 24.4751 10.3954 24.0851 10.0054C23.6951 9.61539 23.0651 9.61539 22.6751 10.0054L12.7951 19.8754Z"
            fill="white"
          />
        </svg>
      </Icon>
      <Icon viewBox="0 0 32 32" style={{ cursor: "pointer" }}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="16" fill="#DA2229" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.29289 9.29289C9.68342 8.90237 10.3166 8.90237 10.7071 9.29289L16 14.5858L21.2929 9.29289C21.6834 8.90237 22.3166 8.90237 22.7071 9.29289C23.0976 9.68342 23.0976 10.3166 22.7071 10.7071L17.4142 16L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3165 23.0976 21.6834 23.0976 21.2929 22.7071L16 17.4142L10.7071 22.7071C10.3166 23.0976 9.68346 23.0976 9.29293 22.7071C8.90241 22.3166 8.90241 21.6834 9.29293 21.2929L14.5858 16L9.29289 10.7071C8.90237 10.3166 8.90237 9.68342 9.29289 9.29289Z"
            fill="white"
          />
        </svg>
      </Icon>
    </HStack>
  );
};

export default Approve;
