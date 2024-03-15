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
                <DialogTitle className="text-xl flex items-center gap-2">
                  <CpuIcon />
                  {tech.technology_name}
                </DialogTitle>
                <DialogDescription>
                  Edit technology: {tech.technology_name}
                </DialogDescription>
              </DialogHeader>
              <Label htmlFor="techName" className="text-lg">
                New Name
              </Label>
              <Input
                id="techName"
                type="text"
                placeholder="Change tech name"
                value={editTech}
                onChange={(e) => setEditTech(e.target.value)}
              />
              <div className="flex justify-between">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => setEditTech(tech.technology_name)}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button>Submit</Button>
              </div>
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
