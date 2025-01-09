import { ServerCookiesNext15 } from "@/registry/default/lib/cookies.server";

export default async function CookiesServerNext15Example() {
  //Set a cookie
  await ServerCookiesNext15.set("language", "en");

  // Get a cookie
  const language = await ServerCookiesNext15.get("language");
  console.log("Current language:", language);

  // Delete a cookie
  await ServerCookiesNext15.delete("language");

  return (
    <div className="space-y-4">
      <div>
        <h3>Next.js 15+ Cookie Values:</h3>
      </div>
    </div>
  );
}
