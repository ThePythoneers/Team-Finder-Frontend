import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { AwardIcon, PlusIcon } from "lucide-react";

export function AddEndorsementDialog() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="h-8">
            <PlusIcon /> Add Endorsement
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-1">
              <AwardIcon /> Add skill endorsement
            </DialogTitle>
            <DialogDescription>
              Skill endorsement provides you more
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={() => {}}>
            <Label htmlFor="input" className="text-lg">
              Training title
            </Label>
            <Input id="input" placeholder="Training title" />
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button>
                  {/* {isPending && (
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                  )} */}
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
