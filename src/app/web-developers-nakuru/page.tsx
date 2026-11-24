import { LocationPage } from "@/components/shared/LocationPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/web-developers-nakuru",
  title: "Web Developers in Nakuru | Website Design",
  description: "Website design and web development for Nakuru businesses. Business websites from KSh 15,000, online shops, web applications and ongoing support.",
});

export default function Page() {
  return <LocationPage location="Nakuru" />;
}
