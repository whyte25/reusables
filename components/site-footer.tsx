import { siteConfig } from "@/constant/site-config";

export function Footer() {
  return (
    <footer className="absolute bottom-0 left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-2">
      <div className="container-wrapper">
        <div className="container py-4">
          <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              fas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
