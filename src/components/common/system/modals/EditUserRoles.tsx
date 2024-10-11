import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { useState, useEffect } from 'react';
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
import { Pencil } from 'lucide-react';
import SelectComponent from '../../Input/select';
import { useAssignRole } from '@/lib/client/useSystemAdmin';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { toast } from 'sonner';

// Zod schema to validate the form data
const editRoleSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['Admin', 'Analyst']),
});

type EditRoleFormData = z.infer<typeof editRoleSchema>;

export function EditDialog({ existingEmail, existingRole }: { existingEmail: string; existingRole: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditRoleFormData>({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
      email: existingEmail,
      role: existingRole as 'Admin' | 'Analyst',
    },
  });
  const { mutateAsync, isPending } = useAssignRole();

  // Watches the form fields to check if they change
  const email = watch('email');
  const role = watch('role');

  // Function to handle form submission
  const onSubmit = (data: EditRoleFormData) => {
    mutateAsync(
      {
        email: data.email,
        devRole: data.role.toUpperCase(),
      },
      {
        onSuccess: () => {
          toast.success('User role updated successfully');
          reset();
          setIsOpen(false);
        },
      },
    );
  };

  // Disable save button if inputs are not changed
  const isDisabled = !isDirty || (email === existingEmail && role === existingRole);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Pencil className="text-main_DarkBlue cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to a user here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Email Input */}
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

          {/* Role Select */}
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
          <Button
            disabled={isDisabled || isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? <LoadingSpinner /> : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
