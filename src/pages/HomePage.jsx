import React, { useState, useEffect, useCallback } from 'react';
import BulkLinkGenerator from '../components/features/linkGenerator/BulkLinkGenerator';
import SearchHistorySection from '../components/features/linkGenerator/SearchHistorySection';
import { ShieldCheck, ChartBar, Users, Link } from 'lucide-react';
import { useRole } from '../contexts/RoleContext';

const MetricCard = ({ title, value, trend, icon: Icon, onClick }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">{value}</span>
                    {trend &&
                        <span className={`text-sm ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {trend}
                        </span>}
                </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
                <Icon className="w-6 h-6 text-blue-600" />
            </div>
        </div>
    </div>
);

const HomePage = ({ searchQuery, setNotifications, notifications }) => {
    const [sessionSearchCount, setSessionSearchCount] = useState(0);
    const [uniqueCompanies, setUniqueCompanies] = useState(0);
    const [generatedLinkCount, setGeneratedLinkCount] = useState(0);
    const { currentRole } = useRole();
    const [showHistory, setShowHistory] = useState(false);

    const toggleHistory = () => {
        setShowHistory(!showHistory);
    };

    const updateMetrics = useCallback(() => {
        try {
            const storedHistory = localStorage.getItem(`searchHistory_${currentRole}`);
            const history = storedHistory ? JSON.parse(storedHistory) : [];
             const filteredHistory = searchQuery ? history.filter(item =>
                item.company.toLowerCase().includes(searchQuery.toLowerCase())
            ) : history;
            setSessionSearchCount(filteredHistory.length);

             const uniqueCompaniesSet = new Set(filteredHistory.map(item => item.company));
            setUniqueCompanies(uniqueCompaniesSet.size);

            const storedLinks = localStorage.getItem(`generatedLinks_${currentRole}`)
            const links = storedLinks ? JSON.parse(storedLinks) : []
            setGeneratedLinkCount(links?.length || 0)

        } catch (e) {
            console.error('Error updating metrics from localStorage', e);
        }
    }, [currentRole, searchQuery]);
   
    useEffect(() => {
      updateMetrics()
    }, [updateMetrics]);
    
    return (
        <div className="dashboard-content">
            {/* Metrics Overview */}
            <div className="metrics-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricCard
                    title="Session Searches"
                    value={sessionSearchCount}
                    icon={ChartBar}
                    onClick={toggleHistory}
                />
                <MetricCard
                    title="Unique Companies"
                    value={uniqueCompanies}
                    icon={Users}
                    onClick={toggleHistory}
                />
                <MetricCard
                    title="Links Generated"
                    value={generatedLinkCount}
                    icon={Link}
                    onClick={toggleHistory}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Generator Card */}
                <div className="lg:col-span-2">
                    <div className="generator-card bg-white rounded-2xl shadow-xl p-6">
                        <BulkLinkGenerator updateMetrics={updateMetrics} setNotifications={setNotifications} />
                    </div>
                </div>

                {/* Recent Activity Sidebar */}
                <div className="activity-feed bg-white rounded-2xl shadow-xl p-6 h-fit lg:sticky lg:top-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <SearchHistorySection
  compact={true}
  searchHistory={localStorage.getItem(`searchHistory_${currentRole}`) ? JSON.parse(localStorage.getItem(`searchHistory_${currentRole}`)) : []}
  onClearHistory={() => {
      localStorage.removeItem(`searchHistory_${currentRole}`);
      updateMetrics();
  }}
  // Connect this to your BulkLinkGenerator:
  onSearchAgain={(company) => {
    // Scroll to the search form first
    document.getElementById('search-form-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    // Then trigger the search with a slight delay to ensure scroll completes
    setTimeout(() => {
      // You'll need to expose this function or use a state/context to trigger the search
      if (window.triggerSearch) {
        window.triggerSearch([company]);
      }
    }, 300);
  }}
/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;