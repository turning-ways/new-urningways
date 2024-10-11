import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useDeleteRole } from '@/lib/client/useSystemAdmin';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function DeleteUserDialog({ email }: { email: string }) {
  const { mutateAsync, isPending } = useDeleteRole();
  const [isOpen, setIsOpen] = useState(false);


  const onSubmit = () => {
    mutateAsync({ email }, {
      onSuccess: () => {
        toast.success('Role Deleted successfully');
        setIsOpen(false)
      },
    },);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Trash2 className="text-red-500 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            user? Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} className='bg-red-500' onClick={onSubmit}>
            {isPending ? <LoadingSpinner /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
