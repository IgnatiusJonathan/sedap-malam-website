import Footer from "@/components/footer";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="menu-layout">
      {children}
      <Footer />
    </div>
  );
}