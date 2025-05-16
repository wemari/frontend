// src/components/member/MemberFinancePage.jsx
import React from 'react';
import SummaryCards from './SummaryCards';
import GivingHeatmap from './GivingHeatmap';
import MonthlyGivingChart from './MonthlyGivingChart';
import Badges from './Badges';
import PledgeProgressList from './MemberPledgeList';
import MemberContributionList from './MemberContributionList';

export default function MemberFinancePage({ memberId }) {
  return (
    <div style={{ padding: 20 }}>
      <SummaryCards memberId={memberId} />
      <GivingHeatmap memberId={memberId} />
      <MonthlyGivingChart memberId={memberId} />
      <Badges memberId={memberId} />
      <PledgeProgressList memberId={memberId} />
      <MemberContributionList memberId={memberId} />
    </div>
  );
}
