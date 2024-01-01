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
import { DELETE_CAR } from '@/lib/api-constants';
import { API } from '@/services';
import { setDependence } from '@/stores/reducers/depReducer';

export function DeleteCarDialog({ data }: { data: any }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const res = await API.destroy(DELETE_CAR + `/${data.id}`);

    if (res.status === 200) {
      toast.success('Xóa thành công');
      //   load data
      dispatch(setDependence({}));
    } else {
      toast.error('Xóa thất bại');
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
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Xe <span className="font-bold">{data?.name}</span> sẽ bị xóa
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-between">
          <AlertDialogCancel className="min-w-[100px]">Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="min-w-[100px]">
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
