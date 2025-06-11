import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import StatsSummaryGrid from '@/components/Dashboard/StatsSummaryGrid';
import PortfolioSummary from '@/components/Dashboard/PortfolioSummary';
import MarketGraph from '@/components/Dashboard/MarketGraph';
import CurrencyCardGrid from '@/components/Dashboard/CurrencyCardGrid';

/**
 * IndexPage for the Crypto Dashboard.
 * This page composes various dashboard components within the MainAppLayout.
 * It follows the structure: PageHeader, StatsSummaryGrid, a two-column layout 
 * for PortfolioSummary and MarketGraph, and finally CurrencyCardGrid.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* Main content container with vertical spacing between sections */}
      <div className="flex flex-col gap-6">
        <PageHeader />
        <StatsSummaryGrid />
        {/* Two-column layout for Portfolio Summary and Market Graph */}
        {/* Responsive: stacks on smaller screens, 2fr/3fr split on lg screens and up */}
        {/* minmax(0, Xfr) prevents content overflow issues with fractional units in grids */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)] gap-6">
          <PortfolioSummary />
          <MarketGraph />
        </div>
        <CurrencyCardGrid />
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
