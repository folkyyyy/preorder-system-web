export default function AdminOrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">ออเดอร์เมนูอาหาร</h2>
        <p className="text-muted-foreground">
          ตรวจสอบและจัดการคำสั่งซื้อทั้งหมด
        </p>
      </div>
      
      <div className="min-h-[400px] rounded-xl bg-muted/50 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
        <span className="text-muted-foreground">ตารางรายการออเดอร์และสถานะ</span>
      </div>
    </div>
  )
}
