export const Layout = ({ children }) => {
  return (
    <section className="bg-gray-900 text-white min-h-[calc(100vh-4rem)]">
      <main className="container mx-auto h-5/6 py-10">
        {children}
      </main>
    </section>
  )
}