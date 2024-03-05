import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Role, type_user_fake_db, user_fake_db } from "@/api/fake_db";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { Badge } from "@/components/ui/badge";
import { RolesDropdownSubMenu } from "@/components/rolesDropdownMenu";

const columns: ColumnDef<type_user_fake_db>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ cell }) => {
      const data: Role[] | unknown = cell.getValue();
      const role_names = data.map((role: Role) => {
        let variant:
          | "outline"
          | "default"
          | "secondary"
          | "destructive"
          | null
          | undefined;
        switch (role.role_name) {
          case "Employee":
            variant = "outline";
            break;
          case "Organization Admin":
            variant = "destructive";
            break;
          case "Department Manager":
            variant = "default";
            break;
          case "Project Manager":
            variant = "secondary";
            break;
        }
        return (
          <Badge key={role.id} variant={variant} className="mr-1 my-1">
            {role.role_name}
          </Badge>
        );
      });
      return role_names;
    },
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <RolesDropdownSubMenu />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function EmployeesPage() {
  return (
    <>
      <main className="container mx-auto py-4">
        <DataTable columns={columns} data={user_fake_db} />
      </main>
    </>
  );
}
