"use client";

import type { UserWithRole } from "better-auth/plugins";
import { format } from "date-fns";
import { Plus } from "lucide-react";

import { UserRole } from "@/config/const";

import { cn } from "@/lib/utils";

import { CreateUserDialog } from "./create-user-dialog";
import { UserTableActions } from "./user-table-actions";
import { UserTableSort as Sort } from "./user-table-sort";
import { DataTableProvider } from "@/components/shared/data-table-provider";
import {
  DataTableFilterDebounce,
  DataTableFilterLimit,
  DataTableFilterPagination,
  DataTableFilterSearch,
} from "@/components/shared/filter/data-table";
import { NoData } from "@/components/shared/no-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          <CreateUserDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </CreateUserDialog>
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
                  <Sort column="emailVerified">Verified</Sort>
                </TableHead>
                <TableHead>
                  <Sort column="role">Role</Sort>
                </TableHead>
                <TableHead>
                  <Sort column="createdAt">Created At</Sort>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id} className="h-12">
                  <TableCell className="pl-4">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.emailVerified && (
                      <Badge variant="secondary" className="capitalize">
                        Verified
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "capitalize",
                        user.role === UserRole.Admin &&
                          "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
                      )}
                      variant="secondary"
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(user.createdAt, "yyyy-MM-dd HH:mm")}
                  </TableCell>
                  <TableCell className="pr-4">
                    <UserTableActions user={user} />
                  </TableCell>
                </TableRow>
              ))}
              {!data.length && (
                <TableRow className="h-60">
                  <TableCell colSpan={6}>
                    <NoData className="m-0" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow className="h-12">
                <TableCell colSpan={6}>
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
