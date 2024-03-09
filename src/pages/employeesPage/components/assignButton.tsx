import { assignUserToDepartment } from "@/api/department";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "sonner";

type Props = {
  user: User;
};

export function AssignButton({ user }: Props) {
  const auth = useAuthUser();
  console.log(auth);
  console.log(user);

  // const { mutateAsync: assignMutation, isPending } = useMutation({
  //   mutationFn: assignUserToDepartment,
  // });

  // const handleAssignUser = async() => {
  //   try {
  //       await assignMutation({token, })
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       if (error.message === "Failed to fetch")
  //         return toast.warning(serverErrorMsg);
  //       toast.error(error.message);
  //     }
  //   }
  // };
  return (
    <>
      <Button variant="outline">Assign</Button>
    </>
  );
}
