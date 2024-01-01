import LoadingSpinIcon from '@/components/loading-spin-icon';

const LoadingScreen = ({ title }: { title?: string }) => {
  return (
    <div className="absolute left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/80">
      <div className="flex flex-col items-center justify-center gap-2 text-primary">
        <LoadingSpinIcon className="h-40 w-40" />
        <h2 className="text-2xl font-semibold">
          {title ? <>{title}...</> : 'Đang tải...'}
        </h2>
      </div>
    </div>
  );
};

export default LoadingScreen;
