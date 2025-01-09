import { ClientCookies } from "@/registry/default/lib/cookies.client";

export default function CookiesExample() {
  const handleSetCookie = () => {
    // Set a cookie
    ClientCookies.set("user-preference", "dark-mode");
  };

  const handleGetCookie = () => {
    // Get the value of cookie named 'user-preference'
    const preference = ClientCookies.get("user-preference");
    console.log("Cookie value:", preference);
  };

  const handleDeleteCookie = () => {
    // Delete the cookie named 'user-preference'
    ClientCookies.delete("user-preference");
  };

  return (
    <div className="space-x-4">
      <button onClick={handleSetCookie}>Set Cookie</button>
      <button onClick={handleGetCookie}>Get Cookie</button>
      <button onClick={handleDeleteCookie}>Delete Cookie</button>
    </div>
  );
}
