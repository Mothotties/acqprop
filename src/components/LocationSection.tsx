export function LocationSection() {
  return (
    <div className="grid gap-4">
      <div className="p-8 rounded-lg border bg-card">
        <h3 className="text-2xl font-semibold mb-6">Location Score: 85/100</h3>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-lg border bg-card/50">
              <h4 className="text-lg font-medium mb-3">Neighborhood Rating</h4>
              <p className="text-3xl font-bold text-gold">A+</p>
            </div>
            <div className="p-6 rounded-lg border bg-card/50">
              <h4 className="text-lg font-medium mb-3">School District</h4>
              <p className="text-3xl font-bold text-gold">9/10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}