import TopBar from "./components/Home/TopBar";
import BottomNav from "./components/Home/BottomNav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center background">
      <TopBar />
      <BottomNav />
    </main>
  );
}
