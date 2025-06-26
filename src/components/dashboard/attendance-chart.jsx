import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function AttendanceChart({ data, isLoading = false }) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-100 rounded animate-pulse"></div>
        </CardContent>
      </Card>
    );
  }

  const maxTotal = Math.max(...data.map((d) => d.total));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No attendance data available</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600">Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-slate-600">Absent</span>
                </div>
              </div>

              <div className="space-y-3">
                {data.map((item, index) => {
                  const presentPercentage = (item.present / item.total) * 100;
                  const absentPercentage = (item.absent / item.total) * 100;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-slate-700">{item.date}</span>
                        <span className="text-slate-500">
                          {item.present}/{item.total} ({Math.round(presentPercentage)}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 transition-all duration-300"
                            style={{ width: `${presentPercentage}%` }}
                          ></div>
                          <div
                            className="bg-red-500 transition-all duration-300"
                            style={{ width: `${absentPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
