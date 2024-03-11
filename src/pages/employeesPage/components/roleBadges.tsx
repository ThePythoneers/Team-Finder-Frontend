import { Badge } from "@/components/ui/badge";

type Props = {
  roles: string[];
};

export function RoleBadges({ roles }: Props) {
  return (
    <>
      <div className="flex gap-1">
        {roles.map((role, index) => {
          if (role === "Organization Admin")
            return (
              <Badge key={index} variant="destructive">
                {role}
              </Badge>
            );
          if (role === "Department Manager")
            return <Badge key={index}>{role}</Badge>;
          if (role === "Project Manager")
            return (
              <Badge key={index} variant="secondary">
                {role}
              </Badge>
            );
          if (role === "Employee")
            return (
              <Badge key={index} variant="outline">
                {role}
              </Badge>
            );
        })}
      </div>
    </>
  );
}
