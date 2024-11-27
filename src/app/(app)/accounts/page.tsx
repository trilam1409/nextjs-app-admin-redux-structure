"use client";

import React from "react";
import { useRequest } from "@/services/client-request/use-swr";
import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
import Link from "next/link";
import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { Button, Input } from "@nextui-org/react";
import { SettingsIcon } from "@/components/icons/sidebar/settings-icon";
import { TrashIcon } from "@/components/icons/accounts/trash-icon";
import { InfoIcon } from "@/components/icons/accounts/info-icon";
import { DotsIcon } from "@/components/icons/accounts/dots-icon";
import { AddUser } from "@/app/(app)/accounts/_components/add-user";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { TableWrapper } from "@/components/table";
import { columns } from "@/components/table/data";
import { RenderCell } from "@/components/table/render-cell";

const AccountPage = () => {
  const { data, isLoading } = useRequest({
    url: "https://run.mocky.io/v3/f8d56dff-dc24-4713-91eb-427575658eea",
  });

  return (
    <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <ul className="flex">
        <li className="flex gap-2">
          <HouseIcon />
          <Link href={"/"}>
            <span>Home</span>
          </Link>
          <span> / </span>{" "}
        </li>

        <li className="flex gap-2">
          <UsersIcon />
          <span>Users</span>
          <span> / </span>{" "}
        </li>
        <li className="flex gap-2">
          <span>List</span>
        </li>
      </ul>

      <h3 className="text-xl font-semibold">All Accounts</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
          />
          <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          <AddUser />
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper
          items={data?.data?.items || []}
          columns={columns}
          page={1}
          totalPages={8}
          renderCell={RenderCell}
          onPageChange={(page) => console.log(page)}
          onSortChange={(descriptor) => console.log(descriptor)}
          sortDescriptor={{ column: "name", direction: "ascending" }}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AccountPage;
