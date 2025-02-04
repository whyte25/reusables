import { Hero } from "@/components/hero"
import { Footer } from "@/components/site-footer"

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col justify-center text-center">
      <Hero />
      <Footer />
    </main>
  )
}
