export default function AdminMenusPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">เมนูอาหาร</h2>
        <p className="text-muted-foreground">
          จัดการรายการเมนูอาหารทั้งหมดในระบบ
        </p>
      </div>
      
      <div className="min-h-[400px] rounded-xl bg-muted/50 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
        <span className="text-muted-foreground">ตารางจัดการเมนูอาหาร</span>
      </div>
    </div>
  )
}
