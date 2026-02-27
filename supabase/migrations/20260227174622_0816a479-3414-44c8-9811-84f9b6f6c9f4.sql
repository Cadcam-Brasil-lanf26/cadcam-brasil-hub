
-- Drop the restrictive deny policy
DROP POLICY "Deny public reads" ON public.diagnostico_cnc;

-- Create a permissive SELECT policy allowing anonymous reads
CREATE POLICY "Allow anonymous reads"
ON public.diagnostico_cnc
FOR SELECT
USING (true);
