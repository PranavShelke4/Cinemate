import TopBar from "./components/Home/TopBar";
import Stories from "./components/Home/Stories";
import BottomNav from "./components/Home/BottomNav";
import Posts from "./components/Home/PostComponents/Posts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col background">
      <Stories />
      <Posts />
    </main>
  );
}
