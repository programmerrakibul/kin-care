import LogoutButton from "@/components/ui/LogoutButton";

export const metadata = {
  title: "Home",
  description: "KinCare - Your Trusted Healthcare Partner",
};

export default function Home() {
  return (
    <div>
      <main>
        <h1 className="text-primary">Hello KinCare fellows</h1>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <LogoutButton />
      </main>
    </div>
  );
}
