create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  begin
    new.updated_at = timezone('utc', now());
  exception
    when undefined_column then
      return new;
  end;
  return new;
end;
$$;

create table if not exists public.site_settings (
  id text primary key default 'default',
  hero_image_url text,
  phone_number text,
  google_maps_url text,
  whatsapp_url text,
  telegram_url text,
  facebook_url text,
  instagram_url text,
  tiktok_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint site_settings_singleton check (id = 'default')
);

alter table public.site_settings
  add column if not exists hero_image_url text;

alter table public.site_settings
  add column if not exists phone_number text;

alter table public.site_settings
  add column if not exists google_maps_url text;

alter table public.site_settings
  add column if not exists whatsapp_url text;

alter table public.site_settings
  add column if not exists telegram_url text;

alter table public.site_settings
  add column if not exists facebook_url text;

alter table public.site_settings
  add column if not exists instagram_url text;

alter table public.site_settings
  add column if not exists tiktok_url text;

alter table public.site_settings
  add column if not exists created_at timestamptz default timezone('utc', now());

alter table public.site_settings
  add column if not exists updated_at timestamptz default timezone('utc', now());

update public.site_settings
set
  created_at = coalesce(created_at, timezone('utc', now())),
  updated_at = coalesce(updated_at, timezone('utc', now()))
where created_at is null or updated_at is null;

alter table public.site_settings
  alter column created_at set default timezone('utc', now());

alter table public.site_settings
  alter column updated_at set default timezone('utc', now());

alter table public.categories
  alter column icon drop default;

alter table public.categories
  alter column icon drop not null;

update public.site_settings
set
  hero_image_url = case
    when hero_image_url = 'https://i.ibb.co/3KcTXDy/1633-x-500.png' then null
    else hero_image_url
  end,
  phone_number = case
    when phone_number = '0673740332' then null
    else phone_number
  end,
  google_maps_url = case
    when google_maps_url = 'https://maps.app.goo.gl/7WS3F2kLbbaA58F27' then null
    else google_maps_url
  end;

insert into public.site_settings (
  id
)
values (
  'default'
)
on conflict (id) do nothing;

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists site_settings_public_read on public.site_settings;
create policy site_settings_public_read
on public.site_settings
for select
using (true);

drop policy if exists site_settings_authenticated_manage on public.site_settings;
create policy site_settings_authenticated_manage
on public.site_settings
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
