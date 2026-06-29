
CREATE TABLE public.brands (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  logo text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.brands TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.brands TO authenticated;
GRANT ALL ON public.brands TO service_role;

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone views active brands" ON public.brands
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins view all brands" ON public.brands
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert brands" ON public.brands
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update brands" ON public.brands
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete brands" ON public.brands
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_brands_updated_at
  BEFORE UPDATE ON public.brands
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.brands (slug, name) VALUES
  ('ashna-perfume', 'آشنا پرفیوم'),
  ('lumiere', 'لومیه'),
  ('paris-belle', 'پاریس بل'),
  ('skin-lab', 'اسکین لب'),
  ('rosa', 'رزا'),
  ('nivea', 'نیووآ'),
  ('belfam', 'بل‌فام'),
  ('oriflame', 'اوریفلیم');
