// src/app/page.tsx (temporary — will be replaced in Step 8)
export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary">
          ArtisanHub
        </h1>
        <p className="text-muted-foreground text-lg">
          Handcrafted Marketplace — Setup Complete ✓
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Next.js
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary" />
            TypeScript
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Tailwind
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary" />
            shadcn/ui
          </span>
        </div>
      </div>
    </main>
  );
}
