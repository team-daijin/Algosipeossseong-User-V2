import Category from "@/app/_components/Category";

const CategoryLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-row h-auto overflow-hidden">
      <Category></Category>
      <div>{children}</div>
    </div>
  );
};  

export default CategoryLayout;
