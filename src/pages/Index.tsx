import { useState } from "react";
import logo from "@/assets/logo.png";
import { useDiagnosticoCNC } from "@/hooks/useDiagnosticoCNC";
import DataTable from "@/components/dashboard/DataTable";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import { Skeleton } from "@/components/ui/skeleton";
import PasswordGate from "@/components/dashboard/PasswordGate";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, isLoading, error } = useDiagnosticoCNC();

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with centered logo */}
      <header className="container mx-auto px-6 py-8 flex justify-center">
        <img src={logo} alt="CADCAM Brasil - Jornada Programação CNC" className="h-16 md:h-20 object-contain" />
      </header>

      <main className="container mx-auto px-6 py-8 space-y-12">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-inter text-3xl md:text-4xl font-bold text-primary">Dashboard de Resultados</h1>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6 text-center">
            <p className="text-destructive font-montserrat">
              Erro ao carregar os dados. Verifique as políticas de RLS do Supabase.
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        )}

        {/* Data Table */}
        {!isLoading && !error && data && (
          <>
            <section>
              <h2 className="font-inter text-xl font-semibold text-primary mb-4">Registros ({data.length})</h2>
              <DataTable data={data} />
            </section>

            {/* Charts Section */}
            <section>
              <h2 className="font-inter text-xl font-semibold text-primary mb-4">Gráficos e Análises</h2>
              <DashboardCharts data={data} />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-12 border-t border-border">
        <p className="text-center text-muted-foreground text-sm font-montserrat">
          © 2026 CADCAM Brasil. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Index;
