import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Home",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/categories",
          label: "Action",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: []
        },
        {
          href: "/tags",
          label: "Adventure",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: []
        },
        {
          href: "/tags",
          label: "Basketball",
          active: pathname.includes("/tags"),
          icon: Settings,
          submenus: []
        },
        {
          href: "/tags",
          label: "Beauty",
          active: pathname.includes("/tags"),
          icon: SquarePen,
          submenus: []
        },
      ]
    }
  ];
}
