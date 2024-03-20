import { deleteNotification, getNotifications } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Notif } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BellIcon, XIcon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export function Notifications() {
  const token = useAuthHeader();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications", { token }],
    queryFn: () => getNotifications(token),
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  setInterval(() => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }, 50000);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" className="size-8 relative" variant="ghost">
            <BellIcon />
            {data && data.length > 0 && (
              <div className="absolute bg-destructive size-5 rounded-full top-0 left-4">
                {data ? `${data.length}` : ""}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[400px]">
          {isLoading ? (
            <Skeleton className="size-[100px]" />
          ) : (
            <>
              <div className="flex flex-col gap-1 w-full">
                {data.map((notif: Notif, index: number) => {
                  if (notif.type === "ALLOCATION")
                    return (
                      <div key={index} className="flex justify-between">
                        A new allocation
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8"
                          onClick={async () =>
                            await mutateAsync({ token, _id: notif.id })
                          }
                        >
                          <XIcon />
                        </Button>
                      </div>
                    );
                  if (notif.type === "DEALLOCATION")
                    return (
                      <div key={index} className="flex justify-between">
                        A new deallocation
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8"
                          onClick={async () =>
                            await mutateAsync({ token, _id: notif.id })
                          }
                        >
                          <XIcon />
                        </Button>
                      </div>
                    );
                  if (notif.type === "VALIDATION")
                    return (
                      <div key={index} className="flex justify-between">
                        A new skill validation
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8"
                          onClick={async () =>
                            await mutateAsync({ token, _id: notif.id })
                          }
                        >
                          <XIcon />
                        </Button>
                      </div>
                    );
                })}
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
