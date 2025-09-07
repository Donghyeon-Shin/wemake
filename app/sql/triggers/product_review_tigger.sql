CREATE FUNCTION public.handle_product_review_add_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY definer
SET search_path = ''
AS $$
BEGIN
    UPDATE public.products
    SET stats = jsonb_set(stats, '{reviews}', (COALESCE((stats->>'reviews')::int, 0) + 1)::text::jsonb)
    WHERE product_id = NEW.product_id;
    RETURN NEW;
END;
$$;

CREATE TRIGGER product_review_add_trigger
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.handle_product_review_add_trigger();

CREATE FUNCTION public.handle_product_review_remove_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY definer
SET search_path = ''
AS $$
BEGIN
    UPDATE public.products
    SET stats = jsonb_set(stats, '{reviews}', (COALESCE((stats->>'reviews')::int, 0) - 1)::text::jsonb)
    WHERE product_id = OLD.product_id;
    RETURN OLD;
END;
$$;

CREATE TRIGGER product_review_remove_trigger
AFTER DELETE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.handle_product_review_remove_trigger();
