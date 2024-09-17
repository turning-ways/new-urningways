import Link from 'next/link';

export default function NavItem({
  item,
  isActive,
}: {
  item: { name: string; to: string };
  isActive: boolean;
}) {
  return (
    // if isActive is true, it is a p component, else it is an a Link component
    isActive ? (
      <p className="text-white font-semibold">{item.name}</p>
    ) : (
      <Link href={item.to}>
        <p className="text-gray-200 font-light">{item.name}</p>
      </Link>
    )
  );
}
