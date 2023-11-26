import { Pen } from 'lucide-react';

import EditProfileForm from '@/components/forms/EditProfileForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EditProfileDialogProps {
  name: string;
  dateOfBirth: Date;
  gender: string;
}

export function EditProfileDialog({
  name,
  dateOfBirth,
  gender,
}: EditProfileDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-transparent hover:bg-gray-100"
        >
          <Pen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin</DialogTitle>
        </DialogHeader>

        <EditProfileForm
          name={name}
          dateOfBirth={dateOfBirth}
          gender={gender}
        />
      </DialogContent>
    </Dialog>
  );
}
