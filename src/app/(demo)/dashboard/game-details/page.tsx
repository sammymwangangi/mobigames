import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { GameDetails } from "@/components/Description";

export default function GameDetailsPage() {
  return (
    <ContentLayout title="MobiGames">
      
     <GameDetails />
    </ContentLayout>
  );
}
