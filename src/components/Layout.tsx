import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-purple-50">
        <Header />
        <main>{children}</main>
      </div>
    );
  }