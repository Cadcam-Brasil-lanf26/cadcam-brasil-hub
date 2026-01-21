import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { DiagnosticoCNC } from "@/hooks/useDiagnosticoCNC";

interface DataTableProps {
  data: DiagnosticoCNC[];
}

const DataTable = ({ data }: DataTableProps) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <ScrollArea className="w-full">
        <div className="min-w-[1400px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Nome</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">WhatsApp</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">E-mail</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Você é</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Idade</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Conhece o Prof.</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Empregado</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Salário</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">1ª vez na Jornada</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Falta aprender</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Campanha</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Origem</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Público</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Anúncio</TableHead>
                <TableHead className="font-inter font-semibold text-primary whitespace-nowrap">Data de criação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={15} className="text-center text-muted-foreground py-8 font-montserrat">
                    Nenhum registro encontrado
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row) => (
                  <TableRow key={row.id} className="hover:bg-secondary/30">
                    <TableCell className="font-montserrat text-foreground">{row.name || "-"}</TableCell>
                    <TableCell className="font-montserrat text-foreground">{row.phone || "-"}</TableCell>
                    <TableCell className="font-montserrat text-foreground">{row.email || "-"}</TableCell>
                    <TableCell className="font-montserrat text-foreground">{row.voce_e}</TableCell>
                    <TableCell className="font-montserrat text-foreground">{row.qual_idade}</TableCell>
                    <TableCell className="font-montserrat text-foreground max-w-[150px] truncate" title={row.tempo_conhece_prof}>
                      {row.tempo_conhece_prof}
                    </TableCell>
                    <TableCell className="font-montserrat text-foreground">{row.esta_empregado}</TableCell>
                    <TableCell className="font-montserrat text-foreground">{row.valor_salario}</TableCell>
                    <TableCell className="font-montserrat text-foreground">{row.primeira_vez_jornada}</TableCell>
                    <TableCell className="font-montserrat text-foreground max-w-[200px] truncate" title={row.falta_aprender}>
                      {row.falta_aprender}
                    </TableCell>
                    <TableCell className="font-montserrat text-muted-foreground">{row.utm_campaign || "-"}</TableCell>
                    <TableCell className="font-montserrat text-muted-foreground">{row.utm_source || "-"}</TableCell>
                    <TableCell className="font-montserrat text-muted-foreground">{row.utm_medium || "-"}</TableCell>
                    <TableCell className="font-montserrat text-muted-foreground">{row.utm_content || "-"}</TableCell>
                    <TableCell className="font-montserrat text-muted-foreground whitespace-nowrap">
                      {format(new Date(row.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default DataTable;
