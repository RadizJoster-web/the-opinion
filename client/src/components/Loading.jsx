import "../style/loading.css";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 xl:left-80 z-30 w-full xl:w-[calc(100vw-320px)] h-full xl:h-[calc(100vh-100px)] bg-white flex justify-center items-center ">
      <p className="loader">
        <span>LOADING</span>
      </p>
    </div>
  );
}
