import MergeSortVisualizer from "../components/MergeSortVisualizer";
import "../styles/globals.css";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 ">
        Merge Sort Visualizer
      </h1>
      <MergeSortVisualizer />
    </main>
  );
}
