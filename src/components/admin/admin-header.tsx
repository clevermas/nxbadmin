"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const AdminHeader = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  const relevantSegments =
    pathSegments[0] === "admin"
      ? pathSegments.length === 1
        ? ["users"]
        : pathSegments.slice(1)
      : pathSegments;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-vertical:h-4 data-[orientation=vertical]:self-center"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin">Admin</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {relevantSegments.length > 0 && <BreadcrumbSeparator />}
            {relevantSegments.map((segment, index) => {
              const isLast = index === relevantSegments.length - 1;
              return (
                <React.Fragment key={segment}>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="capitalize">
                      {segment}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
