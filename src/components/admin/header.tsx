import { ModeToggle } from '@/components/mode-toggle';

const Header = () => {
  return (
    <header className="sticky left-0 right-0 top-0 z-30 w-full bg-slate-50 p-4 text-black shadow dark:bg-black dark:text-white">
      <div className="text-right">
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
