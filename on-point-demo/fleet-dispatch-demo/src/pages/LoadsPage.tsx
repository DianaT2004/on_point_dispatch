import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useLoadsStore } from '../stores/loadsStore';
import LoadDetailModal from '../components/LoadDetailModal';
import AutoDispatchModal from '../components/AutoDispatchModal';
import {
  SparklesIcon,
  MapPinIcon,
  DollarSignIcon,
  TruckIcon,
  CalendarIcon,
  FilterIcon,
} from 'lucide-react';
import { formatCurrency, formatDistance, getAIScoreColor, getAIScoreBgColor, getAIScoreLabel } from '../lib/utils';

export default function LoadsPage() {
  const {
    setSelectedLoad,
    isScanning,
    scanProgress,
    startAiScan,
    getFilteredLoads,
    filters,
    updateFilters,
  } = useLoadsStore();
  
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const loads = getFilteredLoads();

  const handleLoadClick = (load: any) => {
    setSelectedLoad(load);
  };

  return (
    <div className="p-4 lg:p-8 pb-20 lg:pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Available Loads</h1>
            <p className="text-muted-foreground mt-1">
              {loads.length} loads optimized by AI
            </p>
          </div>
          
          <Button
            onClick={startAiScan}
            disabled={isScanning}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            {isScanning ? 'Scanning...' : 'AI Scan'}
          </Button>
        </div>

        {/* AI Scanning Progress */}
        {isScanning && (
          <Card className="p-4 bg-blue-50 border-blue-200 animate-pulse">
            <div className="flex items-center gap-3 mb-2">
              <SparklesIcon className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-sm font-medium text-blue-900">
                AI analyzing optimal loads...
              </span>
            </div>
            <Progress value={scanProgress} className="h-2" />
          </Card>
        )}

        {/* Filters */}
        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <FilterIcon className="w-4 h-4" />
            Filters
          </Button>
          
          <Select
            value={filters.sortBy}
            onValueChange={(value: any) => updateFilters({ sortBy: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ai-score">AI Score</SelectItem>
              <SelectItem value="payment">Highest Pay</SelectItem>
              <SelectItem value="distance">Closest</SelectItem>
              <SelectItem value="pickup-date">Earliest Pickup</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showFilters && (
          <Card className="mt-4 p-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                placeholder="Search by city or state..."
                value={filters.location}
                onChange={(e) => updateFilters({ location: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Min Pay (₾)</label>
                <Input
                  type="number"
                  value={filters.minPay}
                  onChange={(e) => updateFilters({ minPay: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Max Distance (km)</label>
                <Input
                  type="number"
                  value={filters.maxDistance}
                  onChange={(e) => updateFilters({ maxDistance: parseInt(e.target.value) || 1000 })}
                />
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Loads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {loads.map((load) => (
          <Card
            key={load.id}
            className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/50"
            onClick={() => handleLoadClick(load)}
          >
            {/* AI Score Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getAIScoreBgColor(load.aiScore)}`}>
                <SparklesIcon className={`w-4 h-4 ${getAIScoreColor(load.aiScore)}`} />
                <span className={`text-sm font-medium ${getAIScoreColor(load.aiScore)}`}>
                  {load.aiScore}% • {getAIScoreLabel(load.aiScore)}
                </span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(load.payment)}
              </div>
            </div>

            {/* Load Title */}
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {load.title}
            </h3>

            {/* Route */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPinIcon className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">{load.origin}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPinIcon className="w-4 h-4 text-green-500" />
                <span className="text-foreground font-medium">{load.destination}</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">Distance</span>
                <span className="text-sm font-medium text-foreground">
                  {formatDistance(load.distance)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">Weight</span>
                <span className="text-sm font-medium text-foreground">
                  {(load.weight / 1000).toFixed(1)}t
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">Pickup</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date(load.pickupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Requirements */}
            {load.requirements.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {load.requirements.map((req, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-muted text-xs font-medium rounded-md text-muted-foreground"
                  >
                    {req}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {loads.length === 0 && !isScanning && (
        <Card className="p-12 text-center">
          <TruckIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No loads available yet</h3>
          <p className="text-muted-foreground mb-4">
            Click AI Scan to find the best loads optimized for you
          </p>
          <Button onClick={startAiScan} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <SparklesIcon className="w-4 h-4 mr-2" />
            Start AI Scan
          </Button>
        </Card>
      )}

      <LoadDetailModal />
      <AutoDispatchModal open={showDispatchModal} onOpenChange={setShowDispatchModal} />
    </div>
  );
}
