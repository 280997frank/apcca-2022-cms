import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { LoginPayload, LoginResponse } from "@/types/auth";
import { removeAccessToken } from "@/utils";

const MUTATION_LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
    }
  }
`;

interface ResponseLoginMutation {
  login: LoginResponse;
}

export const useLoginSubmit = () => {
  const toast = useToast();
  const [login, { data: response, loading }] = useMutation<
    ResponseLoginMutation,
    { loginInput: LoginPayload }
  >(MUTATION_LOGIN, {
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
  });

  return {
    login,
    response,
    loading,
  };
};

export const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(() => {
    removeAccessToken();
    router.push("/");
  }, [router]);

  return logout;
};
