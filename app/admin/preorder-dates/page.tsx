export default function AdminPreorderDatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">วันที่พรีออเดอร์</h2>
        <p className="text-muted-foreground">
          กำหนดช่วงเวลาและรอบการสั่งอาหาร
        </p>
      </div>
      
      <div className="min-h-[400px] rounded-xl bg-muted/50 border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
        <span className="text-muted-foreground">ปฏิทินและตารางจัดการรอบพรีออเดอร์</span>
      </div>
    </div>
  )
}
