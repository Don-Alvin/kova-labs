import { LocationPage } from "@/components/shared/LocationPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/web-developers-kisumu",
  title: "Web Developers in Kisumu | Website Design",
  description: "Website design and web development for Kisumu businesses. Business websites from KSh 15,000, online shops, web applications and ongoing support.",
});

export default function Page() {
  return <LocationPage location="Kisumu" />;
}
