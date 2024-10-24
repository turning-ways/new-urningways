import { MobileNav } from '@/components/common/system/mobile-nav';
import SystemNavBar from '@/components/common/system/nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navs = [
    {
      name: 'Home',
      to: '/app/home',
    },
    // {
    //   name: 'Explore',
    //   to: '#',
    // },
    // {
    //   name: 'Events',
    //   to: '#',
    // },
  ];

  return (
    <section className="min-h-screen h-screen w-full flex-col flex">
      <SystemNavBar nav={navs} />
      {children}
    </section>
  );
}
