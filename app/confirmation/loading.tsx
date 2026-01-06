export default function ConfirmationLoading() {
  return (
    <main className="min-h-screen bg-racket-lightgray pt-24 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-racket-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-racket-gray">Loading your order...</p>
      </div>
    </main>
  )
}
