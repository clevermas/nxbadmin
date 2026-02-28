import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/config/routes";
import type { PageProps } from "@/config/types";

import { auth } from "@/lib/auth";
import { defaultFilterSearchParams, filterLoader } from "@/lib/filter";
import { limitParser, pageParser, searchParser } from "@/schemas/filter.schema";
import { sortParser } from "@/schemas/user-table.schema";

import { AdminContainer } from "@/components/admin/admin-container";
import { UserTableWrapper } from "@/components/admin/user-table";
import { NoData } from "@/components/shared/no-data";

const filterParsers = {
  q: searchParser,
  page: pageParser,
  limit: limitParser,
  sort: sortParser,
};

export default async function AdminUsersPage(props: PageProps) {
  const searchParams = await props.searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAdmin = session?.user.role === "admin";

  if (!isAdmin) {
    return (
      <AdminContainer type="full-width" className="h-full">
        <NoData />
      </AdminContainer>
    );
  }

  const { q, page, limit, sort, errors } = await filterLoader(
    searchParams,
    filterParsers,
    defaultFilterSearchParams,
  );

  const { id: sortId, order } = sort;

  if (errors.length) {
    redirect(routes.admin);
  }

  const offset = (+page - 1) * limit;

  const { users, total } = await auth.api.listUsers({
    headers: await headers(),
    query: {
      searchValue: q,
      sortBy: sortId,
      sortDirection: order,
      offset,
      limit,
    },
  });

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (page > totalPages) {
    const newSearchParams = new URLSearchParams({
      ...(await searchParams),
      page: "1",
    });
    redirect(`${routes.admin}/?${newSearchParams.toString()}`);
  }

  return (
    <section>
      <AdminContainer type="full-width">
        <div className="flex flex-1 flex-col gap-4">
          <UserTableWrapper data={users} totalPages={totalPages} />
        </div>
      </AdminContainer>
    </section>
  );
}
