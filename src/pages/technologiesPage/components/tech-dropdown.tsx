import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tech } from "@/types";
import {
  CpuIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { deleteTech } from "@/api/technologies";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";

type Props = {
  tech: Tech;
};

export function TechDropdown({ tech }: Props) {
  const token = useAuthHeader();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTechMutation } = useMutation({
    mutationFn: deleteTech,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["technologies"] }),
  });

  const [editTech, setEditTech] = useState<string>(tech.technology_name);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Dialog>
            <DialogTrigger>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <PencilIcon className="size-5 mr-2" /> Edit technologies
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <CpuIcon />
                  {tech.technology_name}
                </DialogTitle>
                <DialogDescription>
                  Edit technology: {tech.technology_name}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => e.preventDefault()}>
                <Label htmlFor="input" className="text-lg">
                  Team Role
                </Label>
                <Input
                  id="input"
                  placeholder="Custom role name"
                  value={editTech}
                  onChange={(e) => setEditTech(e.target.value)}
                />
                <DialogFooter className="mt-2">
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button>
                    {true && (
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                    )}
                    Submit
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <DropdownMenuSeparator />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="bg-destructive"
                onSelect={(e) => e.preventDefault()}
              >
                <Trash2Icon className="size-5 mr-2" /> Delete Tech
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  skill from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () =>
                    await deleteTechMutation({ token, _id: tech.id })
                  }
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
