import { ServerCookies } from "@/registry/default/lib/cookies.server"

export default async function CookiesServerExample() {
  // Set a cookie
  ServerCookies.set("theme", "dark")

  // Get a cookie
  const theme = ServerCookies.get("theme")

  // Delete a cookie
  ServerCookies.delete("theme")

  return (
    <div className="space-y-4">
      <div>
        <h3>Legacy Server Cookie Values:</h3>
      </div>
    </div>
  )
}
