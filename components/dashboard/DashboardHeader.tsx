'use client';

import { TrendingUp, Download, Plus } from 'lucide-react';
import Button from '../ui/Button';

interface DashboardHeaderProps {
  onExport: () => void;
  onAddAccount: () => void;
}

export default function DashboardHeader({ onExport, onAddAccount }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary rounded-lg">
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your social media performance</p>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Button
          variant="outline"
          onClick={onAddAccount}
          className="flex-1 sm:flex-initial"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
        <Button
          variant="primary"
          onClick={onExport}
          className="flex-1 sm:flex-initial"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}
