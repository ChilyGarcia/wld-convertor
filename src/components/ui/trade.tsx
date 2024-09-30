'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import cn from '@/utils/cn';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import ActiveLink from '@/components/ui/links/active-link';
import AnchorLink from '@/components/ui/links/anchor-link';
import { RangeIcon } from '@/components/icons/range-icon';
import { ExportIcon } from '@/components/icons/export-icon';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useLayout } from '@/lib/hooks/use-layout';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { LAYOUT_OPTIONS } from '@/lib/constants';
// dynamic import
const Listbox = dynamic(() => import('@/components/ui/list-box'));

const tradeMenu = [
  {
    name: 'Swap',
    value: routes.swap,
  },
  {
    name: 'Liquidity',
    value: routes.liquidity,
  },
  {
    name: 'Vote',
    value: routes.vote,
  },
];

function ActiveNavLink({ href, title, isActive, className }: any) {
  const { layout } = useLayout();
  return (
    <ActiveLink
      href={{
        pathname:
          (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.swap + layout) + href,
      }}
      className={cn(
        'relative z-[1] inline-flex items-center px-3 py-1.5',
        className,
      )}
      activeClassName="font-medium text-white"
    >
      <span>{title}</span>
      {isActive && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 -z-[1] h-full w-full rounded-lg bg-brand shadow-large"
          layoutId="activeNavLinkIndicator"
        />
      )}
    </ActiveLink>
  );
}

export default function Trade({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const { layout } = useLayout();
  const pathname =
    routes.swap +
    usePathname()
      ?.split('/')
      .slice(layout === LAYOUT_OPTIONS.MODERN ? 1 : 2)
      .join('/');
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const currentPath = tradeMenu.findIndex((item) => item.value === pathname);
  let [selectedMenuItem, setSelectedMenuItem] = useState(tradeMenu[0]);
  function handleRouteOnSelect(path: string) {
    router.push(path);
  }
  useEffect(() => {
    setSelectedMenuItem(tradeMenu[currentPath]);
  }, [currentPath]);
  return (
    <div className="text-sm">
      <div className="mx-auto w-full max-w-lg  p-5 pt-4 dark:bg-light-dark xs:p-6 xs:pt-5">
        <AnimatePresence mode={'wait'}>
          <motion.div
            initial="exit"
            animate="enter"
            exit="exit"
            variants={fadeInBottom('easeIn', 0.25)}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
