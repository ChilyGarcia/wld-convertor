import cn from '@/utils/cn';
import Header from '@/layouts/header/header';
import Sidebar from '@/layouts/sidebar/_default';

export default function ModernLayout({
  children,
  contentClassName,
}: React.PropsWithChildren<{ contentClassName?: string }>) {
  return (
    <div>
      {/* <Header />
      <Sidebar className="hidden xl:block" /> */}
      <main className={cn(contentClassName)}>{children}</main>
    </div>
  );
}
