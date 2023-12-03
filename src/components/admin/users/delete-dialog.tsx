'use client';

import { Delete } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DELETE_USER } from '@/lib/api-constants';
import { API } from '@/services';
import { setDependence } from '@/stores/reducers/depReducer';

export function DeleteDialog({ user }: { user: any }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const res = await API.destroy(DELETE_USER + `/${user.id}`);

    if (res.status === 200) {
      toast.success('Xóa người dùng thành công');
      //   load data
      dispatch(setDependence({}));
    } else {
      toast.error('Xóa người dùng thất bại');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex w-full items-center justify-between gap-2 rounded px-2 py-1 text-sm hover:bg-slate-100">
          Xóa
          <span className="">
            <Delete className="h-4 w-4 text-error" />
          </span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa người dùng "{user?.name}" ?</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
