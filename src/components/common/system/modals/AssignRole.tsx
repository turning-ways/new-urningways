import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
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
import { CirclePlus } from 'lucide-react';
import SelectComponent from '../../Input/select';
import { useAssignRole } from '@/lib/client/useSystemAdmin';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useState } from 'react';
import { toast } from 'sonner';

const assignRoleSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['Admin', 'Analyst']),
});

type AssignRoleFormData = z.infer<typeof assignRoleSchema>;

export function AssignRoleDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignRoleFormData>({
    resolver: zodResolver(assignRoleSchema),
  });
  const { mutateAsync, isPending, isSuccess } = useAssignRole();

  const onSubmit = (data: AssignRoleFormData) => {
    mutateAsync(
      {
        email: data.email,
        devRole: data.role.toUpperCase(),
      },
      {
        onSuccess: () => {
          toast.success('Role assigned successfully');
          reset();
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer border-2 rounded-xl py-3 px-5 gap-2 border-main_DarkBlue items-center">
          <CirclePlus className="bg-main_DarkBlue text-white rounded-full " />
          <p className="capitalize">Assign role</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Role</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input id="email" {...field} className="col-span-3" />
              )}
            />
            {errors.email && (
              <p className="col-span-4 text-right text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="w-full grid grid-cols-4 items-center gap-2">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <div className="col-span-3">
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <SelectComponent
                    placeholder="Select a role"
                    options={['Admin', 'Analyst']}
                    value={field.value}
                    setValue={field.onChange}
                  />
                )}
              />
            </div>
            {errors.role && (
              <p className="col-span-4 text-right text-red-500 text-sm">
                {errors.role.message}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} onClick={handleSubmit(onSubmit)}>
            {isPending ? <LoadingSpinner /> : 'Assign Role'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
