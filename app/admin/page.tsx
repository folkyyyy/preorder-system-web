export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">แดชบอร์ด</h2>
        <p className="text-muted-foreground">
          ภาพรวมของระบบพรีออเดอร์
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">สถิติ {i+1}</h3>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">120</div>
              <p className="text-xs text-muted-foreground">+19% จากเดือนที่แล้ว</p>
            </div>
          </div>
        ))}
      </div>
      <div className="min-h-[400px] rounded-xl bg-muted/50 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
        <span className="text-muted-foreground">พื้นที่สำหรับกราฟและข้อมูล</span>
      </div>
    </div>
  )
}
