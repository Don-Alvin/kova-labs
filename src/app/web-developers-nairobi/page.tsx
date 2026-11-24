import { LocationPage } from "@/components/shared/LocationPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/web-developers-nairobi",
  title: "Web Developers in Nairobi | Website Design",
  description: "Website design and web development for Nairobi businesses. Business websites from KSh 15,000, online shops, web applications and ongoing support.",
});

export default function Page() {
  return <LocationPage location="Nairobi" />;
}
