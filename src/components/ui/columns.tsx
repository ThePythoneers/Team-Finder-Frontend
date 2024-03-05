"use client"

import { type_user_fake_db } from "@/api/fake_db"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<type_user_fake_db>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roles",
    header: "Roles",
  },
]
