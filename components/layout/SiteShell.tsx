import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

type Props = {
  children: React.ReactNode;
  /** Full-width main (e.g. home hero); inner sections control their own max-width. */
  fullBleed?: boolean;
};

export function SiteShell({ children, fullBleed }: Props) {
  return (
    <>
      <Header />
      <main
        className={
          fullBleed
            ? "flex w-full flex-1 flex-col text-slate-800"
            : "mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 text-slate-800 sm:px-6 lg:px-8"
        }
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
