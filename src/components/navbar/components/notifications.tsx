import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BellIcon } from "lucide-react";

export function Notifications() {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" className="size-8" variant="ghost">
            <BellIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
            <div>sadadwa</div>
        </PopoverContent>
      </Popover>
    </>
  );
}
