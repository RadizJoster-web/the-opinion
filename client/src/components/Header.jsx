export default function Header({ searching }) {
  return (
    <div
      className={`${
        searching ? "hidden" : "flex"
      } sticky top-30 w-full flex justify-center items-start pt-50 lg:pt-0 lg:items-end lg:h-80`}
    >
      <h1 className="text-5xl">Hi, There :]</h1>
    </div>
  );
}
