import Pagination from "@/components/Atoms/Pagination";
import Table from "@/components/Molecules/Table";
import { TDiscussionData } from "@/types/discussionForum";
import React, { useEffect, useState } from "react";
import { useUpdateData, useDiscussionForumList } from "@/hooks/discussionForum";
import ConfirmDelete from "../Atoms/ConfirmDelete";

interface TableDiscussionProps {
  type: string;
}
const TableDiscussion = ({ type }: TableDiscussionProps) => {
  const [data, setData] = useState<any>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    id: "",
    openDeleteDialog: false,
  });
  const [updateType, setUpdateType] = useState("");

  const [valueSearch, setValueSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
  });
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [sortBy, setSortBy] = useState("DESC");

  const {
    fetchDiscussionForumList,
    data: threadList,
    loading: isFetchingThread,
  } = useDiscussionForumList({
    limit: pagination.limit,
    page: pagination.page,
    search: valueSearch,
    status: type,
    orderBy: orderBy,
    sortBy: sortBy,
  });

  const { mutationUpdate } = useUpdateData(
    {
      limit: pagination.limit,
      page: pagination.page,
      search: valueSearch,
      status: type,
      orderBy: orderBy,
      sortBy: sortBy,
    },
    updateType
  );

  useEffect(() => {
    fetchDiscussionForumList();
  }, [fetchDiscussionForumList]);

  useEffect(() => {
    if (threadList?.listThreads.data.length) {
      const temp = threadList.listThreads.data.map((data: TDiscussionData) => {
        return {
          id: data.id,
          title: data.title !== "" ? data.title : "No Title Available",
          startedBy: `${data.creator.firstName} ${data.creator.lastName}`,
          publishDate: data.createdAt,
          status: data.status,
        };
      });
      setData(temp);
    }
  }, [threadList]);

  return (
    <>
      <Table
        dropdownOptions={[
          { value: "WAITING", label: "HIDDEN" },
          { value: "ACTIVE", label: "ACTIVE" },
          { value: "LOCKED", label: "LOCKED" },
        ]}
        columnHeaders={[
          { name: "title", label: "TITLE", type: "title" },
          { name: "startedBy", label: "STARTED BY" },
          { name: "publishDate", label: "PUBLISH DATE", type: "date" },
          { name: "status", label: "", type: "dropdown" },
        ]}
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
              setOrderBy("CREATED_AT");
              setSortBy("ASC");
              break;
            case "UPDATED_AT_DESC":
              setOrderBy("CREATED_AT");
              setSortBy("DESC");
              break;
          }
        }}
        data={data}
        onDropdownChange={async (value, rowId) => {
          setUpdateType("Update");
          await mutationUpdate({
            variables: {
              param: {
                id: rowId,
                status: value,
                isDelete: false,
              },
            },
          });
        }}
        loading={isFetchingThread}
        onRemove={async (value) => {
          setUpdateType("Delete");
          setOpenDeleteDialog({
            id: value,
            openDeleteDialog: true,
          });
        }}
        search={async (val) => setValueSearch(val)}
        // addNewButton={{ bgColor: "#FFDD00", url: "/labs/new" }}
      />
      {threadList && (
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
            if (pagination.page < threadList?.listThreads.totalPage) {
              setPagination({
                ...pagination,
                page: pagination.page + 1,
              });
            }
          }}
          total={threadList ? threadList?.listThreads.totalPage : 1}
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
          await mutationUpdate({
            variables: {
              param: {
                id: openDeleteDialog.id,
                status: "ACTIVE",
                isDelete: true,
              },
            },
          });
        }}
        header="Do you want to delete?"
        body="Do you really want to delete this record? This process cannot be undone."
        type="delete"
      />
    </>
  );
};

export default TableDiscussion;
