import { Button } from "../../ui/button";
import { CopyIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Input } from "../../ui/input";
import { getOrganization, refreshInviteLink } from "@/api/organization";
import { Skeleton } from "../../ui/skeleton";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthUser } from "@/types";

export function InviteEmployeesPopover() {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const organization_id = auth?.organization_id;

  const { data: organizationData, isLoading } = useQuery({
    queryKey: ["invite", { organization_id }],
    queryFn: () => getOrganization({ token, organization_id }),
  });
  const [inviteLink, setInviteLink] = useState("");

  const queryClient = useQueryClient();
  const {
    mutateAsync: refreshInviteLinkMutation,
    isPending: refreshInviteLinkPending,
  } = useMutation({
    mutationFn: refreshInviteLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["invite"] }),
  });

  const handleRefreshClick = async () => {
    const data = await refreshInviteLinkMutation(token);
    setInviteLink(`${window.location.origin}/invite/${data.refferal}`);
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() =>
              setInviteLink(
                `${window.location.origin}/invite/${organizationData.link_ref}`
              )
            }
          >
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
