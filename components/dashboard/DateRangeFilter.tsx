'use client';

import { DateRange } from '@/types';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Card } from '../ui/Card';

interface DateRangeFilterProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  customDateRange?: { start: Date; end: Date };
  onCustomDateChange?: (start: Date, end: Date) => void;
}

export default function DateRangeFilter({
  dateRange,
  onDateRangeChange,
  customDateRange,
  onCustomDateChange,
}: DateRangeFilterProps) {
  const [showCustom, setShowCustom] = useState(dateRange === 'custom');
  const [startDate, setStartDate] = useState(
    customDateRange?.start.toISOString().split('T')[0] || ''
  );
  const [endDate, setEndDate] = useState(
    customDateRange?.end.toISOString().split('T')[0] || ''
  );

  const handleRangeChange = (value: string) => {
    const range = value as DateRange;
    onDateRangeChange(range);
    setShowCustom(range === 'custom');
  };

  const handleApplyCustom = () => {
    if (startDate && endDate && onCustomDateChange) {
      onCustomDateChange(new Date(startDate), new Date(endDate));
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-semibold">Date Range</h3>
        </div>

        <Select value={dateRange} onChange={(e) => handleRangeChange(e.target.value)}>
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
          <option value="custom">Custom range</option>
        </Select>

        {showCustom && (
          <div className="space-y-3 pt-2 border-t border-border">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate || undefined}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || undefined}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApplyCustom}
              disabled={!startDate || !endDate}
              className="w-full"
            >
              Apply
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
