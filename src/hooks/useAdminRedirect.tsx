import { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "@/types";

export function useAdminRedirect() {
  const navigate = useNavigate();
  const auth: AuthUser | null = useAuthUser();
  useEffect(() => {
    if (!auth?.roles.includes("Organization Admin")) {
      navigate(`/${auth?.organization_name}`);
    }
  });
  return;
}
