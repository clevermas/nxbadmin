import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminContainer } from "../admin-container";

export const ProfileSettingsSkeleton = () => {
  return (
    <section>
      <AdminContainer className="space-y-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4.5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
            <div className="pt-2">
              <Skeleton className="h-8 w-24" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4.5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="hidden sm:block" />
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
            <div className="pt-2">
              <Skeleton className="h-8 w-24" />
            </div>
          </CardContent>
        </Card>
      </AdminContainer>
    </section>
  );
};
