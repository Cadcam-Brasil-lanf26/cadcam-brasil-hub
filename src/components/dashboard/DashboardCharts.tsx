import { useState, useMemo } from "react";
import { format, parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { DiagnosticoCNC } from "@/hooks/useDiagnosticoCNC";

interface DashboardChartsProps {
  data: DiagnosticoCNC[];
}

const COLORS = ["#5170FF", "#7B93FF", "#A3B5FF", "#CCD7FF", "#3B5BDB", "#2E4BC4"];

const DashboardCharts = ({ data }: DashboardChartsProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");

  // Filter data based on date range and campaign
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const itemDate = parseISO(item.created_at);
      
      // Date filter
      if (startDate && endDate) {
        if (!isWithinInterval(itemDate, { start: startOfDay(startDate), end: endOfDay(endDate) })) {
          return false;
        }
      } else if (startDate) {
        if (itemDate < startOfDay(startDate)) return false;
      } else if (endDate) {
        if (itemDate > endOfDay(endDate)) return false;
      }

      // Campaign filter
      if (selectedCampaign !== "all" && item.utm_campaign !== selectedCampaign) {
        return false;
      }

      return true;
    });
  }, [data, startDate, endDate, selectedCampaign]);

  // Get unique campaigns
  const campaigns = useMemo(() => {
    const unique = [...new Set(data.map((d) => d.utm_campaign).filter(Boolean))];
    return unique as string[];
  }, [data]);

  // Chart data: Anúncios que mais converteram
  const adConversionData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach((item) => {
      const ad = item.utm_content || "Sem anúncio";
      counts[ad] = (counts[ad] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name: name.length > 20 ? name.substring(0, 20) + "..." : name, value, fullName: name }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [filteredData]);

  // Chart data: Origem (Source)
  const sourceData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach((item) => {
      const source = item.utm_source || "Sem origem";
      counts[source] = (counts[source] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  // Chart data: Faixa etária
  const ageData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach((item) => {
      counts[item.qual_idade] = (counts[item.qual_idade] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  // Chart data: Empregado
  const employmentData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach((item) => {
      counts[item.esta_empregado] = (counts[item.esta_empregado] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedCampaign("all");
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-inter text-lg font-semibold text-primary mb-4">Filtros</h3>
        <div className="flex flex-wrap gap-4 items-end">
          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-montserrat text-muted-foreground">Data inicial</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd/MM/yyyy") : "Selecionar"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-sm font-montserrat text-muted-foreground">Data final</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd/MM/yyyy") : "Selecionar"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Campaign Filter */}
          <div className="space-y-2">
            <label className="text-sm font-montserrat text-muted-foreground">Campanha</label>
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Todas as campanhas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as campanhas</SelectItem>
                {campaigns.map((campaign) => (
                  <SelectItem key={campaign} value={campaign}>
                    {campaign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="secondary" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </div>
        <p className="mt-4 text-sm font-montserrat text-muted-foreground">
          Exibindo <span className="text-primary font-semibold">{filteredData.length}</span> de{" "}
          <span className="text-primary font-semibold">{data.length}</span> registros
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Converting Ads */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-inter text-lg font-semibold text-primary mb-4">
            Anúncios que mais converteram
          </h3>
          {adConversionData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={adConversionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={120}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: number, name: string, props: any) => [value, props.payload.fullName]}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">Sem dados para exibir</p>
          )}
        </div>

        {/* Source Distribution */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-inter text-lg font-semibold text-primary mb-4">
            Distribuição por Origem
          </h3>
          {sourceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">Sem dados para exibir</p>
          )}
        </div>

        {/* Age Distribution */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-inter text-lg font-semibold text-primary mb-4">
            Distribuição por Idade
          </h3>
          {ageData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">Sem dados para exibir</p>
          )}
        </div>

        {/* Employment Status */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-inter text-lg font-semibold text-primary mb-4">
            Status de Emprego
          </h3>
          {employmentData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={employmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {employmentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center py-12">Sem dados para exibir</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
