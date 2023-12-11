import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="absolute left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/80">
      <div className="flex flex-col items-center justify-center gap-2 text-primary">
        <Loader2 className="h-40 w-40 animate-spin" />
        <h2 className="text-2xl font-semibold">Đang thanh toán</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
