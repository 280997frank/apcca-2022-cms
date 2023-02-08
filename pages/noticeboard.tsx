import Layout from "@/components/Templates/Layout";
import Pagination from "@/components/Atoms/Pagination";
import Table from "@/components/Molecules/Table";
import React, { useEffect, useState } from "react";
import ConfirmDelete from "@/components/Atoms/ConfirmDelete";
import { VStack } from "@chakra-ui/react";
import {
  useDeleteNoticeBoardData,
  useNoticeboardList,
  useToggleNoticeBoardData,
} from "@/hooks/noticeboard";

const DiscussionForum = () => {
  const [data, setData] = useState<any>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    id: "",
    openDeleteDialog: false,
  });

  const [valueSearch, setValueSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [orderBy, setOrderBy] = useState("UPDATED_AT");
  const [sortBy, setSortBy] = useState("DESC");
  const {
    fetchNoticeboard,
    data: noticeboardList,
    loading: isFetchingThread,
  } = useNoticeboardList({
    limit: pagination.limit,
    page: pagination.page,
    search: { keyword: valueSearch },
    order: {
      orderBy: orderBy,
      sortBy: sortBy,
    },
  });
  const { mutationToggle } = useToggleNoticeBoardData({
    limit: pagination.limit,
    page: pagination.page,
    search: { keyword: valueSearch },
    order: {
      orderBy: orderBy,
      sortBy: sortBy,
    },
  });
  const { mutationDelete } = useDeleteNoticeBoardData({
    limit: pagination.limit,
    page: pagination.page,
    search: { keyword: valueSearch },
    order: {
      orderBy: orderBy,
      sortBy: sortBy,
    },
  });

  useEffect(() => {
    if (noticeboardList?.listNoticeboard.data.length) {
      const temp = noticeboardList?.listNoticeboard.data.map((data: any) => {
        return {
          id: data.id,
          title: data.title !== "" ? data.title : "No Title Available",
          publishDate: data.updatedAt,
          isActive: data.isActive,
        };
      });
      setData(temp);
    }
  }, [noticeboardList]);

  // "2022-08-16T07:53:37.519Z";
  useEffect(() => {
    fetchNoticeboard();
  }, [fetchNoticeboard]);

  return (
    <Layout title="Discussion Forum" isPrivate>
      <VStack
        align="flex-start"
        padding={"10"}
        w="100%"
        border="1px solid #D7D7D7"
        borderRadius="16px"
        marginTop={"10"}
        background="#fff"
      >
        <Table
          columnHeaders={[
            { name: "title", label: "TITLE", type: "linkDetail" },
            { name: "publishDate", label: "PUBLISH DATE", type: "date" },
            { name: "isActive", label: "", type: "linkEdit" },
            { name: "isActive2", label: "", type: "switch" },
          ]}
          dropdownOptions={[]}
          filterChange={async (val) => {
            switch (val) {
              case "TITLE_ASC":
                setOrderBy("TITLE");
                setSortBy("ASC");
                break;
              case "TITLE_DESC":
                setOrderBy("TITLE");
                setSortBy("DESC");
                break;
              case "UPDATED_AT_ASC":
                setOrderBy("UPDATED_AT");
                setSortBy("ASC");
                break;
              case "UPDATED_AT_DESC":
                setOrderBy("UPDATED_AT");
                setSortBy("DESC");
                break;
            }
          }}
          data={data}
          // onDropdownChange={async (value, rowId) => {
          //   await mutationUpdate({
          //     variables: {
          //       param: {
          //         id: rowId,
          //         status: value,
          //         isDelete: false,
          //       },
          //     },
          //   });
          // }}
          onSwitchChange={async (value, rowId) => {
            console.log(value, "value");
            const isActiveValue = data.find((data: any) => data.id == rowId);
            await mutationToggle({
              variables: {
                toggleStatusNoticeboardInput: {
                  id: rowId,
                  status: !isActiveValue.isActive,
                },
              },
            });
          }}
          loading={isFetchingThread}
          onRemove={async (value) => {
            setOpenDeleteDialog({
              id: value,
              openDeleteDialog: true,
            });
          }}
          search={async (val) => setValueSearch(val)}
          addNewButton={{ bgColor: "#FFDD00", url: "/noticeboard/new" }}
        />
        {noticeboardList && (
          <Pagination
            onPrevClick={() => {
              if (pagination.page > 1) {
                setPagination({
                  ...pagination,
                  page: pagination.page - 1,
                });
              }
            }}
            onNextClick={() => {
              if (pagination.page < noticeboardList.listNoticeboard.totalPage) {
                setPagination({
                  ...pagination,
                  page: pagination.page + 1,
                });
              }
            }}
            total={
              noticeboardList ? noticeboardList.listNoticeboard.totalPage : 1
            }
            onChange={(e) => {
              if (e.target.value === "") return;
              setPagination({
                ...pagination,
                page: parseInt(e.target.value),
              });
            }}
            currentPage={pagination.page}
          />
        )}
        <ConfirmDelete
          isOpen={openDeleteDialog.openDeleteDialog}
          onClose={() =>
            setOpenDeleteDialog({
              id: "",
              openDeleteDialog: false,
            })
          }
          onConfirmAction={async () => {
            await mutationDelete({
              variables: {
                deleteNoticeboardInput: {
                  id: openDeleteDialog.id,
                },
              },
            });
          }}
          header="Do you want to delete?"
          body="Do you really want to delete this record? This process cannot be undone."
          type="delete"
        />
      </VStack>
    </Layout>
  );
};

export default DiscussionForum;
