import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConnectedAccount, AccountAnalytics, ExportOptions } from '@/types';
import { format } from 'date-fns';
import { formatNumber } from './utils';

/**
 * Generate and download a PDF report with social media analytics
 */
export function generatePDFReport(
  accounts: ConnectedAccount[],
  analytics: AccountAnalytics[],
  options: ExportOptions
): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Title
  doc.setFontSize(24);
  doc.setTextColor(99, 102, 241); // Primary color
  doc.text('Social Media Analytics Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;

  // Date range
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // Muted color
  const dateRangeText = `${format(options.dateRange.start, 'MMM dd, yyyy')} - ${format(options.dateRange.end, 'MMM dd, yyyy')}`;
  doc.text(dateRangeText, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Summary Section
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42); // Foreground color
  doc.text('Summary', 14, yPosition);
  yPosition += 8;

  // Calculate totals
  const totalViews = analytics.reduce((sum, a) => sum + a.totalViews, 0);
  const totalLikes = analytics.reduce((sum, a) => sum + a.totalLikes, 0);
  const totalFollowers = analytics.reduce((sum, a) => sum + a.currentFollowers, 0);
  const totalGrowth = analytics.reduce((sum, a) => sum + a.followerGrowth, 0);
  const avgEngagement = analytics.reduce((sum, a) => sum + a.engagementRate, 0) / analytics.length;

  // Summary metrics table
  const summaryData: any[][] = [];
  
  if (options.selectedMetrics.views) {
    summaryData.push(['Total Views', formatNumber(totalViews)]);
  }
  if (options.selectedMetrics.likes) {
    summaryData.push(['Total Likes', formatNumber(totalLikes)]);
  }
  if (options.selectedMetrics.followers) {
    summaryData.push(['Total Followers', formatNumber(totalFollowers)]);
    summaryData.push(['Follower Growth', `+${totalGrowth.toLocaleString()}`]);
  }
  if (options.selectedMetrics.engagement) {
    summaryData.push(['Average Engagement Rate', `${avgEngagement.toFixed(2)}%`]);
  }

  autoTable(doc, {
    startY: yPosition,
    head: [['Metric', 'Value']],
    body: summaryData,
    theme: 'grid',
    headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 10 },
    margin: { left: 14, right: 14 },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // Account Breakdown Section
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text('Account Breakdown', 14, yPosition);
  yPosition += 8;

  // Filter analytics by selected accounts
  const selectedAnalytics = analytics.filter(a => options.accounts.includes(a.accountId));

  selectedAnalytics.forEach((accountAnalytics, index) => {
    const account = accounts.find(a => a.id === accountAnalytics.accountId);
    if (!account) return;

    // Check if we need a new page
    if (yPosition > pageHeight - 80) {
      doc.addPage();
      yPosition = 20;
    }

    // Account header
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(`${account.username} (${account.platform.charAt(0).toUpperCase() + account.platform.slice(1)})`, 14, yPosition);
    yPosition += 6;

    // Account metrics table
    const accountData: any[][] = [];
    
    if (options.selectedMetrics.views) {
      accountData.push(['Views', formatNumber(accountAnalytics.totalViews)]);
    }
    if (options.selectedMetrics.likes) {
      accountData.push(['Likes', formatNumber(accountAnalytics.totalLikes)]);
    }
    if (options.selectedMetrics.followers) {
      accountData.push(['Followers', formatNumber(accountAnalytics.currentFollowers)]);
      accountData.push(['Growth', `+${accountAnalytics.followerGrowth.toLocaleString()}`]);
    }
    if (options.selectedMetrics.engagement) {
      accountData.push(['Engagement Rate', `${accountAnalytics.engagementRate.toFixed(2)}%`]);
    }

    autoTable(doc, {
      startY: yPosition,
      body: accountData,
      theme: 'plain',
      styles: { fontSize: 9 },
      margin: { left: 20, right: 14 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 60 },
        1: { cellWidth: 'auto' },
      },
    });

    yPosition = (doc as any).lastAutoTable.finalY + 10;
  });

  // Historical Data Section (if there's space)
  if (yPosition < pageHeight - 100 && selectedAnalytics.length > 0) {
    doc.addPage();
    yPosition = 20;

    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text('Historical Performance', 14, yPosition);
    yPosition += 8;

    // Create a combined metrics table
    const selectedAnalytic = selectedAnalytics[0]; // Show first account's data
    const metricsToShow = selectedAnalytic.metrics.slice(-10); // Last 10 days

    const historicalData = metricsToShow.map(metric => {
      const row: any[] = [format(new Date(metric.date), 'MMM dd')];
      
      if (options.selectedMetrics.views) row.push(formatNumber(metric.views));
      if (options.selectedMetrics.likes) row.push(formatNumber(metric.likes));
      if (options.selectedMetrics.followers) row.push(formatNumber(metric.followers));
      if (options.selectedMetrics.engagement) row.push(`${metric.engagement}%`);
      
      return row;
    });

    const headers: string[] = ['Date'];
    if (options.selectedMetrics.views) headers.push('Views');
    if (options.selectedMetrics.likes) headers.push('Likes');
    if (options.selectedMetrics.followers) headers.push('Followers');
    if (options.selectedMetrics.engagement) headers.push('Engagement');

    autoTable(doc, {
      startY: yPosition,
      head: [headers],
      body: historicalData,
      theme: 'striped',
      headStyles: { fillColor: [99, 102, 241], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 9 },
      margin: { left: 14, right: 14 },
    });
  }

  // Footer on last page
  const pageCount = doc.getNumberOfPages();
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Generated by Naly - ${format(new Date(), 'MMM dd, yyyy HH:mm')}`,
      14,
      pageHeight - 10
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 14,
      pageHeight - 10,
      { align: 'right' }
    );
  }

  // Download the PDF
  const fileName = `social-media-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
  doc.save(fileName);
}
