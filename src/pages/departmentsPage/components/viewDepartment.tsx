import { getDepartmentInfo } from "@/api/department";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Department } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { MessageCircleCodeIcon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  department: Department;
};

export function ViewDepartmentDialog({ department }: Props) {
  const token = useAuthHeader();
  const department_id = department.id;

  const { data: departmentInfoData, isLoading } = useQuery({
    queryKey: ["departmentInfo", { token }],
    queryFn: () => getDepartmentInfo({ token, department_id }),
  });
  console.log("🚀 ~ ViewDepartmentDialog ~ departmentInfoData:", departmentInfoData)
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <MessageCircleCodeIcon className="size-5 mr-1" /> View Department
          </DropdownMenuItem>
        </DialogTrigger>
        {isLoading ? (
          <Skeleton className=" w-full h-100px" />
        ) : (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {department.department_name}
              </DialogTitle>
              <DialogDescription>{department.manager_email}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
