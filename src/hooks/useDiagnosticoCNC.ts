import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DiagnosticoCNC {
  id: string;
  created_at: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  utm_campaign: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_content: string | null;
  voce_e: string;
  qual_idade: string;
  tempo_conhece_prof: string;
  esta_empregado: string;
  valor_salario: string;
  primeira_vez_jornada: string;
  falta_aprender: string;
}

export const useDiagnosticoCNC = () => {
  return useQuery({
    queryKey: ["diagnostico_cnc"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("diagnostico_cnc")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Map the data to friendly names
      return (data || []).map((item) => ({
        id: item.id,
        created_at: item.created_at,
        name: item.name,
        phone: item.phone,
        email: item.email,
        utm_campaign: item.utm_campaign,
        utm_source: item.utm_source,
        utm_medium: item.utm_medium,
        utm_content: item.utm_content,
        voce_e: item["Você é"],
        qual_idade: item["Qual a sua idade"],
        tempo_conhece_prof: item["Há quanto tempo você conhece o Prof. Fernando Ferreira"],
        esta_empregado: item["Você está empregado"],
        valor_salario: item["Qual o valor do seu salário atual"],
        primeira_vez_jornada: item["É a primeira vez que você participa da JORNADA DA PROGRAMAÇ"],
        falta_aprender: item["O que realmente FALTA você APRENDER para considerar que isso s"],
      })) as DiagnosticoCNC[];
    },
  });
};
