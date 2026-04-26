import 'dotenv/config';
import { Client } from 'pg';

const databaseUrl = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error(
    'Missing SUPABASE_DB_URL (or DATABASE_URL). Add your Supabase Postgres connection string to .env before running npm run dev.',
  );
  process.exit(1);
}

const client = new Client({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

const bootstrapSql = `
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

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text,
  order_index integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.categories
  add column if not exists icon text;

alter table public.categories
  add column if not exists created_at timestamptz default timezone('utc', now());

alter table public.categories
  add column if not exists updated_at timestamptz default timezone('utc', now());

update public.categories
set
  created_at = coalesce(created_at, timezone('utc', now())),
  updated_at = coalesce(updated_at, timezone('utc', now()))
where created_at is null or updated_at is null;

alter table public.categories
  alter column created_at set default timezone('utc', now());

alter table public.categories
  alter column updated_at set default timezone('utc', now());

create unique index if not exists categories_name_unique_idx
  on public.categories (lower(name));

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10, 2) not null check (price >= 0),
  category text not null,
  is_available boolean not null default true,
  image_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists products_category_idx
  on public.products (category);

create index if not exists products_available_idx
  on public.products (is_available);

alter table public.products
  add column if not exists created_at timestamptz default timezone('utc', now());

alter table public.products
  add column if not exists updated_at timestamptz default timezone('utc', now());

update public.products
set
  created_at = coalesce(created_at, timezone('utc', now())),
  updated_at = coalesce(updated_at, timezone('utc', now()))
where created_at is null or updated_at is null;

alter table public.products
  alter column created_at set default timezone('utc', now());

alter table public.products
  alter column updated_at set default timezone('utc', now());

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_category_fk'
  ) then
    alter table public.products
      add constraint products_category_fk
      foreign key (category)
      references public.categories (name)
      on update cascade
      on delete restrict;
  end if;
exception
  when duplicate_object then
    null;
  when others then
    raise notice 'Skipping products_category_fk creation: %', sqlerrm;
end
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

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row
execute function public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists categories_public_read on public.categories;
create policy categories_public_read
on public.categories
for select
using (true);

drop policy if exists categories_authenticated_manage on public.categories;
create policy categories_authenticated_manage
on public.categories
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

drop policy if exists products_public_read on public.products;
create policy products_public_read
on public.products
for select
using (is_available = true or auth.role() = 'authenticated');

drop policy if exists products_authenticated_manage on public.products;
create policy products_authenticated_manage
on public.products
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

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

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists images_public_read on storage.objects;
create policy images_public_read
on storage.objects
for select
using (bucket_id = 'images');

drop policy if exists images_authenticated_insert on storage.objects;
create policy images_authenticated_insert
on storage.objects
for insert
with check (
  bucket_id = 'images'
  and auth.role() = 'authenticated'
);

drop policy if exists images_authenticated_update on storage.objects;
create policy images_authenticated_update
on storage.objects
for update
using (
  bucket_id = 'images'
  and auth.role() = 'authenticated'
)
with check (
  bucket_id = 'images'
  and auth.role() = 'authenticated'
);

drop policy if exists images_authenticated_delete on storage.objects;
create policy images_authenticated_delete
on storage.objects
for delete
using (
  bucket_id = 'images'
  and auth.role() = 'authenticated'
);
`;

async function main() {
  await client.connect();
  await client.query(bootstrapSql);
  console.log('Supabase bootstrap completed.');
}

main()
  .catch((error) => {
    console.error('Supabase bootstrap failed.');
    console.error(error.message || error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end().catch(() => {});
  });
