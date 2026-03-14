import { cn } from "@/components/utils/cn"
import Link from "next/link"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  isCollapsed: boolean
  slug: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active = false,
  isCollapsed,
  slug = '#',
}) => {
  return (
<Link
  href={`${slug}`}
  className={cn(
    "group flex items-center rounded px-4 py-2 text-sm transition",
    active
      ? "bg-gray-800 text-gray-200"
      : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
  )}
>
  <Icon
    className={cn(
      "size-4 shrink-0 transition-colors",
      active
        ? "text-gray-100"
        : "text-gray-500 group-hover:text-indigo-400"
    )}
  />

  <span
    className={cn(
      "ml-4 font-medium transition-opacity duration-200",
      isCollapsed && "hidden opacity-0"
    )}
  >
    {label}
  </span>
</Link>
  )
}

export default SidebarItem