import Link from "next/link";
import Image from "next/image";
import { PanelsTopLeft } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomePage() {
  return (
    <ContentLayout title="MobiGames">
      
      <PlaceholderContent />
    </ContentLayout>
  );
}
