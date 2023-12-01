import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function UserNav() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Thêm người dùng</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Họ tên</Label>
            <Input id="name" autoFocus />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Tài khoản</Label>
            <Input id="username" autoFocus />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Thêm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
