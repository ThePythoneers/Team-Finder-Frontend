import { Button } from "../button";
import { CopyIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { serverErrorMsg } from "@/api/URL";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Input } from "../input";
import { getOrganization, refreshInviteLink } from "@/api/organization";
import { Skeleton } from "../skeleton";

export function InviteEmployeesPopover() {
  const token = useAuthHeader();
  const { data: organizationData, isLoading } = useQuery({
    queryKey: ["invite", { token }],
  });
  const [inviteLink, setInviteLink] = useState("");

  const {
    mutateAsync: refreshInviteLinkMutation,
    isPending: refreshInviteLinkPending,
  } = useMutation({
    mutationFn: refreshInviteLink,
  });

  const handleRefreshClick = async () => {
    try {
      const data = await refreshInviteLinkMutation(token);
      setInviteLink(`${window.location.origin}/invite/${data}`);
      toast.success("You generated a new invite link");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Failed to fetch")
          return toast.warning(serverErrorMsg);
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="ml-2" variant="ghost" size="icon">
            <PlusIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2 mb-2">
            <h4 className="font-medium leading-none">Invite</h4>
            <p className="text-sm text-muted-foreground">
              Invite your employees with this link
            </p>
          </div>
          {isLoading ? (
            <Skeleton className="w-full h-[45px]" />
          ) : (
            <>
              <div className="flex gap-2 mb-2">
                <Input value={inviteLink} type="text" readOnly />
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink);
                    toast.success("You copied the invite link");
                  }}
                >
                  <CopyIcon />
                </Button>
              </div>
              <Button
                className="mt-2"
                variant="ghost"
                onClick={handleRefreshClick}
              >
                {refreshInviteLinkPending && (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                )}
                New Link
              </Button>
            </>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
