import Count from "./components/count";
// import Pdf from "./components/pdf";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center m-10">Character Counter</h1>
      <Count />
      {/* <Pdf /> */}
    </div>
  );
}
