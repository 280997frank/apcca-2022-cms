import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

import {
  NoticeboardList,
  NoticeboardInput,
  TReqNotice,
  GetNoticeboardByIdInput,
  GetNoticeboardByIdResponse,
  CreateNoticeboardInput,
  UpdateNoticeboardInput,
  TReqNoticeBoardToggleInput,
  TResNoticeBoardSingleResponse,
  TReqNoticeBoardDeleteInput,
  TResDeleteNoticeBoardResponse,
} from "@/types/noticeboard";

const GET_NOTICEBOARD = gql`
  query listNoticeboard($listNoticeboardInput: ListNoticeboardInput!) {
    listNoticeboard(listNoticeboardInput: $listNoticeboardInput) {
      page
      limit
      total
      totalPage
      data {
        id
        title
        description
        totalLike
        isActive
        updatedAt
        documents {
          id
          noticeboardId
          title
          url
          noticeboardAssetType
        }
        notifications {
          createdAt
        }
        photosAndVideos {
          id
          noticeboardId
          title
          url
          noticeboardAssetType
        }
        #isLike
        #noticeBoardReactionCount
      }
    }
  }
`;

const GET_NOTICEBOARD_BY_ID = gql`
  query getNoticeboardById($getNoticeboardByIdInput: GetNoticeboardByIdInput!) {
    getNoticeboardById(getNoticeboardByIdInput: $getNoticeboardByIdInput) {
      id
      title
      description
      totalLike
      documents {
        id
        noticeboardId
        title
        url
        noticeboardAssetType
      }
      photosAndVideos {
        id
        noticeboardId
        title
        url
        noticeboardAssetType
      }
    }
  }
`;

const CREATE_NOTICEBOARD = gql`
  mutation createNoticeboard($createNoticeboardInput: CreateNoticeboardInput!) {
    createNoticeboard(createNoticeboardInput: $createNoticeboardInput) {
      id
    }
  }
`;

const UPDATE_NOTICEBOARD = gql`
  mutation editNoticeboard($editNoticeboardInput: EditNoticeboardInput!) {
    editNoticeboard(editNoticeboardInput: $editNoticeboardInput) {
      id
    }
  }
`;

const TOGGLE_NOTICEBOARD_BY_ID = gql`
  mutation toggleStatusNoticeboard(
    $toggleStatusNoticeboardInput: ToggleStatusNoticeboardInput!
  ) {
    toggleStatusNoticeboard(
      toggleStatusNoticeboardInput: $toggleStatusNoticeboardInput
    ) {
      id
      title
      description
      totalLike
      documents {
        id
        noticeboardId
        title
        url
        noticeboardAssetType
      }
      photosAndVideos {
        id
        noticeboardId
        title
        url
        noticeboardAssetType
      }
    }
  }
`;

const DELETE_NOTICEBOARD_BY_ID = gql`
  mutation deleteNoticeboard($deleteNoticeboardInput: DeleteNoticeboardInput!) {
    deleteNoticeboard(deleteNoticeboardInput: $deleteNoticeboardInput) {
      success
    }
  }
`;

export const useNoticeboardList = (payload: TReqNotice) => {
  const toast = useToast();
  const [fetchNoticeboard, { data, loading, called }] = useLazyQuery<
    NoticeboardList,
    NoticeboardInput
  >(GET_NOTICEBOARD, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    variables: {
      listNoticeboardInput: payload,
    },
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
    fetchNoticeboard,
    data,
    loading,
    called,
  };
};

export const useCreateNoticeboard = () => {
  const toast = useToast();
  const [create, { data: response, loading }] = useMutation<
    unknown,
    CreateNoticeboardInput
  >(CREATE_NOTICEBOARD, {
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
    create,
    response,
    loading,
  };
};

export const useUpdateNoticeboard = () => {
  const toast = useToast();
  const [update, { data: response, loading }] = useMutation<
    unknown,
    UpdateNoticeboardInput
  >(UPDATE_NOTICEBOARD, {
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
    update,
    response,
    loading,
  };
};

export const useGetNoticeboardById = () => {
  const toast = useToast();
  const [fetchGetNoticeboardById, { data, loading, called }] = useLazyQuery<
    GetNoticeboardByIdResponse,
    GetNoticeboardByIdInput
  >(GET_NOTICEBOARD_BY_ID, {
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
    fetchGetNoticeboardById,
    data,
    loading,
    called,
  };
};

export const useToggleNoticeBoardData = (payload: TReqNotice) => {
  const { fetchNoticeboard } = useNoticeboardList(payload);
  const toast = useToast();
  const [mutationToggle, { data, loading, called }] = useMutation<
    TResNoticeBoardSingleResponse,
    TReqNoticeBoardToggleInput
  >(TOGGLE_NOTICEBOARD_BY_ID, {
    onCompleted: () => {
      toast({
        title: `Succes Update Data`,
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      fetchNoticeboard();
    },
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
      fetchNoticeboard();
    },
  });

  return {
    mutationToggle,
    data,
    loading,
    called,
  };
};

export const useDeleteNoticeBoardData = (payload: TReqNotice) => {
  const { fetchNoticeboard } = useNoticeboardList(payload);
  const toast = useToast();
  const [mutationDelete, { data, loading, called }] = useMutation<
    TResDeleteNoticeBoardResponse,
    TReqNoticeBoardDeleteInput
  >(DELETE_NOTICEBOARD_BY_ID, {
    onCompleted: () => {
      toast({
        title: `Succes Update Data`,
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      fetchNoticeboard();
    },
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
      fetchNoticeboard();
    },
  });

  return {
    mutationDelete,
    data,
    loading,
    called,
  };
};
