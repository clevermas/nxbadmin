"use client";

import { UserWithRole } from "better-auth/plugins";
import { format } from "date-fns";

import { DataTableProvider } from "@/components/shared/data-table-provider";
import {
  DataTableFilterDebounce,
  DataTableFilterLimit,
  DataTableFilterPagination,
  DataTableFilterSearch,
} from "@/components/shared/filter/data-table";
import { NoData } from "@/components/shared/no-data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserTableSort as Sort } from "./user-table-sort";

interface UserTableProps {
  data: UserWithRole[];
  totalPages: number;
}

export const UserTableWrapper = (props: UserTableProps) => {
  return (
    <DataTableProvider>
      <UserTable {...props}></UserTable>
    </DataTableProvider>
  );
};

const UserTable = ({ data, totalPages }: UserTableProps) => {
  return (
    <>
      <DataTableFilterDebounce />
      <div className="flex justify-between">
        <DataTableFilterSearch />
        <div className="flex flex-1 justify-end items-center gap-4 text-sm">
          <DataTableFilterLimit />
        </div>
      </div>

      <Card className="p-0 mb-4 gap-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="h-12">
              <TableRow>
                <TableHead className="pl-4">
                  <Sort column="name">Name</Sort>
                </TableHead>
                <TableHead>
                  <Sort column="email">Email</Sort>
                </TableHead>
                <TableHead>
                  <Sort column="role">Role</Sort>
                </TableHead>
                <TableHead>
                  <Sort column="createdAt">Created At</Sort>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id} className="h-12">
                  <TableCell className="pl-4">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {format(user.createdAt, "yyyy-MM-dd HH:mm:ss")}
                  </TableCell>
                </TableRow>
              ))}
              {!data.length && (
                <TableRow className="h-60">
                  <TableCell colSpan={4}>
                    <NoData className="m-0" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow className="h-12">
                <TableCell colSpan={4}>
                  {totalPages > 1 && (
                    <div className="flex justify-end items-center gap-4">
                      <DataTableFilterPagination
                        totalPages={totalPages}
                      ></DataTableFilterPagination>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};
