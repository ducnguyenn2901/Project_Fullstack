import { Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';

interface AIInsightBannerProps {
  unclassifiedCount?: number;
  onAutoClassify?: () => void;
}

export function AIInsightBanner({ unclassifiedCount = 0, onAutoClassify }: AIInsightBannerProps) {
  if (unclassifiedCount === 0) {
    return (
      <Alert className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <Sparkles className="h-4 w-4 text-purple-600" />
        <AlertDescription className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-purple-900">
              ✨ AI đã phân loại tất cả giao dịch của bạn một cách chính xác!
            </span>
          </div>
          <div className="flex items-center gap-1 text-purple-600 bg-purple-100 px-2 py-1 rounded">
            <TrendingUp className="w-4 h-4" />
            <span>100% hoàn thành</span>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <span className="text-yellow-900">
            Có {unclassifiedCount} giao dịch chưa được phân loại chính xác. 
          </span>
          <span className="text-yellow-700 ml-1">
            AI có thể giúp bạn tối ưu hóa!
          </span>
        </div>
        {onAutoClassify && (
          <Button
            size="sm"
            variant="outline"
            onClick={onAutoClassify}
            className="gap-2 bg-white hover:bg-yellow-50 border-yellow-300"
          >
            <Sparkles className="w-4 h-4" />
            Tự động phân loại
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
