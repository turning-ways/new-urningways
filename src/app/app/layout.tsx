import SystemNavBar from "@/components/common/system/nav";

export default function Layout({children}: {children: React.ReactNode}) {
  const navs = [
    {
      name: 'Home',
      to: '/app/home',
    },
    {
      name: 'Explore',
      to: '/app/explore',
    },
    {
      name: 'Events',
      to: '/app/events',
    },
  ]


  return (
    <section className="min-h-screen w-full flex-col flex">
      <SystemNavBar nav={navs} />
      {children}
    </section>
  );
}