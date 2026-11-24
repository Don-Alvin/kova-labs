import { LocationPage } from "@/components/shared/LocationPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/web-developers-kenya",
  title: "Web Developers in Kenya | Website Design",
  description: "Website design and web development for businesses across Kenya. Business websites from KSh 15,000, online shops, web applications and ongoing support.",
});

export default function Page() {
  return <LocationPage location="Kenya" />;
}
