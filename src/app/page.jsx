import HomePage from "@/components/ui/HomePage";
import { getCategories } from "./actions/server/api";

export const metadata = {
  title: "Home",
  description: "KinCare - Your Trusted Healthcare Partner",
};

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <HomePage categories={categories} />
    </>
  );
}
