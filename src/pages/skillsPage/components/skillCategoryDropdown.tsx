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
import { AuthUser, SkillCategory } from "@/types";
import {
  Loader2Icon,
  MoreHorizontalIcon,
  PencilIcon,
  ShieldIcon,
  Trash2Icon,
} from "lucide-react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
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
import { deleteSkillCategory, updateSkillCategory } from "@/api/skill";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  category: SkillCategory;
};

export function SkillCategoryDropdown({ category }: Props) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteSkillMutation } = useMutation({
    mutationFn: deleteSkillCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["skillCategories"] }),
  });

  const handleDelete = async () => {
    const data = await deleteSkillMutation({ token, _id: category.id });
    if (!data) return;
  };

  const [newSkillCategoryName, setNewSkillCategoryName] = useState(
    category.category_name
  );

  const { mutateAsync: updateSkillCategoryMutation, isPending } = useMutation({
    mutationFn: updateSkillCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teamRoles"] }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateSkillCategoryMutation({
      token,
      category_id: category.id,
      category_name: newSkillCategoryName,
    });
  };

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
          {/* <ViewSkill skill={skill} />
          <AssignSkill skill={skill} /> */}
          {auth?.roles?.includes("Department Manager") && (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="flex gap-2"
                  >
                    <PencilIcon />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-1">
                      <ShieldIcon /> {category.category_name}
                    </DialogTitle>
                    <DialogDescription>
                      Edit skill category: {category.category_name}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <Label htmlFor="input" className="text-lg">
                      Skill Category Name
                    </Label>
                    <Input
                      id="input"
                      placeholder="Custom role name"
                      value={newSkillCategoryName}
                      onChange={(e) => setNewSkillCategoryName(e.target.value)}
                    />
                    <DialogFooter className="mt-2">
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <DialogClose>
                        <Button>
                          {isPending && (
                            <Loader2Icon className="mr-2 size-4 animate-spin" />
                          )}
                          Submit
                        </Button>
                      </DialogClose>
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
                    <Trash2Icon className="size-5 mr-2" /> Delete Category
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the skill from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
