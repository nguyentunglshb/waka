import { HomeCarousel } from "@/components/home";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-dark-overlay">
      <HomeCarousel />
    </main>
  );
}
