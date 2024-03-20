import { getInActiveUserProjects } from "@/api/project";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Code2Icon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export function PastProjects() {
  const token = useAuthHeader();
  const { data, isLoading } = useQuery({
    queryKey: ["activeUserProjects", { token }],
    queryFn: () => getInActiveUserProjects(token),
  });
  return (
    <>
      {isLoading ? (
        <Skeleton className="size-[100px]" />
      ) : (
        <>
          {data &&
            data.map &&
            data.map((project: Project, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex gap-2">
                    <Code2Icon /> {project.project_name}
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {project.technology_stack.map((tech) => (
                      <Badge key={tech.id} variant="outline">
                        {tech.tech_name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </>
      )}
    </>
  );
}
