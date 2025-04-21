import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function CardsInfo() {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-3 @5xl/main:grid-cols-3 grid grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Penjualan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-3xl font-extrabold tabular-nums">Rp 22,250.00</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs text-green-600">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
            Penjualan meningkat bulan ini <TrendingUpIcon className="size-4 " />
          </div>
          <div className="text-muted-foreground">Dibandingkan dengan 1 bulan terakhir</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Pembeli</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-3xl font-extrabold tabular-nums">1.234</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs text-red-600 border-red-600">
              <TrendingDownIcon className="size-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-red-600">
            Pembeli menurun periode ini <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Dibandingkan dengan 1 bulan terakhir</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Pesanan</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-3xl font-extrabold tabular-nums">45.678</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs text-green-600 border-green-600">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
            Retensi pelanggan meningkat <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Dibandingkan dengan 1 bulan terakhir</div>
        </CardFooter>
      </Card>
    </div>
  );
}
